import { ICareer } from '../../component/career/ICareer';
import snsb3DashboardLock from '../../asset/career/snsb3-dashboard-lock.png';
import snsb3EmailArchitecture from '../../asset/career/snsb3-email-architecture.png';
import snsb3AppPerformance from '../../asset/career/snsb3-app-performance.png';
import mcpServerArchitecture from '../../asset/career/mcp-server-architecture.png';
import bugPipelineArchitecture from '../../asset/career/bug-pipeline-architecture.png';
import laserSystemArchitecture from '../../asset/career/laser-system-architecture.png';

const career: ICareer.Payload = {
  disable: false,
  companies: [
    {
      title: 'HBRC',
      period: '2026.01 ~ Present',
      positionTitle: 'Developer',
      projects: [
        {
          title: 'SNSB3 Standardized Scoring Program — Test-taker Status Dashboard',
          skillKeywords: ['Spring Boot', 'PostgreSQL'],
          role: 'Joined a 2-person team · solely responsible for the test-taker dashboard part',
          blocks: [
            { type: 'heading', text: 'Service Overview' },
            {
              type: 'paragraph',
              text:
                'SNSB3 is a standardized neuropsychological test tool for dementia diagnosis. It is a web-based data collection platform where undergraduate students majoring in clinical fields nationwide directly administer tests to test-takers and enter and score the results, built to accumulate large-scale clinical data.',
            },
            { type: 'heading', text: 'Problem' },
            {
              type: 'paragraph',
              text:
                'The SNSB3 test has a predetermined number of test-takers that must be collected for each age group, gender, and years-of-education bucket. Like seat reservations, each group has a fixed capacity, and exceeding it would introduce data bias, so overflow registrations had to be strictly blocked.',
            },
            {
              type: 'paragraph',
              text:
                'The test-taker status dashboard displays counts as "current registrations / capacity limit," and to prevent exceeding the limit, registration requests were validated by looking up the current count and comparing it against the limit.',
            },
            {
              type: 'paragraph',
              text:
                'However, when multiple requests arrived concurrently, both could read the same "9/10" state, pass validation, and each perform a registration, causing a **race condition where the final result ends up "11/10"**.',
            },
            { type: 'heading', text: 'Technology Selection Process' },
            {
              type: 'list',
              ordered: true,
              items: [
                "I first considered PostgreSQL's SELECT FOR UPDATE (pessimistic locking). However, since the registration count wasn't a simple count column but was computed via a JOIN-based aggregate query across the test-taker, staff, and affiliated-institution tables, FOR UPDATE would also lock rows in tables shared across multiple groups — such as the staff and institution tables pulled in by the JOIN — causing unnecessary lock contention even between unrelated test groups.",
                "I also considered atomically decrementing a counter with Redis's DECR command, but this would require keeping a separate counter state in Redis alongside PostgreSQL and reconciling consistency between the two stores. I judged that adding this much infrastructure wasn't justified at the current scale of concurrent registration traffic, so I didn't adopt it.",
                "I also considered a conditional update of the form UPDATE ... WHERE count < limit. This has the advantage of being handled atomically purely with the DB's row-level lock, blocking overflow with no separate locking. However, applying it would require newly managing the current count as a separate counter column, and every time data changed through another path — such as a test-taker cancellation or edit — that counter would need to stay in sync with the JOIN aggregate result, introducing a new synchronization problem that made it hard to apply without changing the existing data model.",
                "To solve this, I chose PostgreSQL's **pg_advisory_xact_lock**. I also considered a non-blocking option like pg_try_advisory_xact_lock, but since ordering needed to be guaranteed and lock contention was expected to be infrequent, I used the blocking pg_advisory_xact_lock. This approach acquires a lock on an arbitrary application-defined key rather than a DB row, so I could leave the existing JOIN aggregate query logic untouched, serialize only requests for the same test group, and minimize lock contention between unrelated groups.",
              ],
            },
            { type: 'heading', text: 'Implementation' },
            {
              type: 'list',
              ordered: true,
              items: [
                'Concatenated the gender, age-group, and education attributes that define a test group into a string, hashed it with SHA-256, and converted it into an integer lock key (there was no separate PK column representing a group, so the attribute combination itself was used as the key)',
                'Acquired pg_advisory_xact_lock(lockKey) using the computed lock key',
                'After acquiring the lock: look up the current registration count → compare against the limit → perform registration',
                'Automatically unlocked when the transaction ends, so no separate lock management is needed',
              ],
            },
            {
              type: 'image',
              src: snsb3DashboardLock,
              alt: 'Capacity-overflow issue: before vs. after applying the lock',
            },
          ],
        },
        {
          title: 'SNSB3 Standardized Scoring Program — Email Delivery Architecture',
          skillKeywords: ['Spring Boot', 'AWS SES', 'Thymeleaf'],
          role:
            'Joined a 2-person team · solely responsible for the email delivery architecture part',
          blocks: [
            { type: 'heading', text: 'Service Overview' },
            {
              type: 'paragraph',
              text:
                'SNSB3 is a standardized neuropsychological test tool for dementia diagnosis. It is a web-based data collection platform where undergraduate students majoring in clinical fields nationwide directly administer tests to test-takers and enter and score the results, built to accumulate large-scale clinical data.',
            },
            { type: 'heading', text: 'Problem' },
            {
              type: 'paragraph',
              text:
                'A feature was needed to automatically send a notification email to the responsible staff member once test-taker registration was complete. The initial design called email sending directly from within the registration-save logic, but this had the following four problems.',
            },
            {
              type: 'list',
              items: [
                'Transactional consistency — emails could be sent before the data save completed, or could already have been sent even if the save failed',
                'Response latency — the registration API response was delayed by however long the external mail service took to respond, with the risk that registration itself would fail during a mail-service outage',
                'Event-timing issue — since the test-taker number is only finalized in the last step of registration, sending the email too early would send it with an empty test-taker number',
                "SecurityContext loss — the SecurityContext was lost on the async call, making the currently logged-in staff member's information inaccessible",
              ],
            },
            { type: 'heading', text: 'Solution' },
            {
              type: 'list',
              ordered: true,
              items: [
                'Transactional consistency — Introduced **@TransactionalEventListener(AFTER_COMMIT)** so the listener only runs once the data save has fully completed. If the save fails, the email-sending event never fires at all.',
                "Response latency — Combined this with **@Async** to offload email sending to a separate thread, so it no longer affects the registration API's response time.",
                'Event-timing issue — Moved the event-publishing point to after the final save step where the test-taker number is finalized, resolving the empty-number issue.',
                "SecurityContext loss — Solved by extracting the staff member's ID on the request thread at registration time and passing it along with the event, then looking up the email address by that ID on the async thread.",
              ],
            },
            {
              type: 'paragraph',
              text:
                'Email delivery uses AWS SES. Since SES integration was already in place for signup and email verification, I reused the existing, already-proven sending path instead of introducing separate mail infrastructure for this new feature.',
            },
            { type: 'heading', text: 'Implementation Flow' },
            {
              type: 'list',
              items: [
                'Saved data in stages: basic test-taker info → reservation info → finalized test-taker number',
                "After the test-taker number is finalized, publish an email-sending event that includes the staff member's ID",
                'The event runs once the data save is fully complete → handed off to async processing',
                'On the separate thread: look up the email address by staff ID → look up the test-taker number → render the HTML email → send',
              ],
            },
            {
              type: 'image',
              src: snsb3EmailArchitecture,
              alt: 'Email-sending architecture: async processing after commit',
            },
          ],
        },
        {
          title: 'SNSB3 App — Test-entry Performance Improvement',
          skillKeywords: ['Flutter', 'Dart'],
          role:
            'Took over the first-completed app and solely carried out a full refactor and performance improvement',
          blocks: [
            { type: 'heading', text: 'Service Overview' },
            {
              type: 'paragraph',
              text:
                'A service that replaces the SNSB3 test — previously done with a paper test sheet and a pen — with a tablet app. Test-takers can take the test directly in the app through to scoring, and it shares the same backend API as the web scoring program.',
            },
            { type: 'heading', text: 'Problem' },
            {
              type: 'paragraph',
              text:
                'Entering the test screen took about 5.9 seconds on first entry and about 3.6 seconds on re-entry. Measuring with Flutter DevTools, I found the entry-initialization API itself was fast at 131ms, but the bottleneck was concentrated in the subsequent screen loading. There were two causes.',
            },
            {
              type: 'list',
              items: [
                "Duplicate API calls (thundering herd) — the test screen is made up of 28 individual sub-test items. Since the test-data lookup API wasn't split per item and instead returned the entire test result at once, every item controller independently called the same full-lookup API each time it initialized. Because HTTP/1.1 processes requests serially, this produced a **214ms × 28 ≈ 6,000ms delay**.",
                'Rendering all pages up front — to avoid delays from widget creation and API calls on every page transition, the app used an IndexedStack to build all ~39 test-page widgets and fire off each of their API calls at entry time. This made page transitions fast, but caused a large initial load because widget building and API calls all piled up at entry time.',
              ],
            },
            { type: 'heading', text: 'Solution' },
            {
              type: 'list',
              items: [
                "Removed duplicate API calls — only the first caller triggers the real API call, and the other 27 share and await the same Future. Once the API response arrives, the result is cached, and subsequent requests return immediately as cache hits, **cutting what used to be up to 28 API calls down to 1**. Because this cache is reused for the whole session, consistency needed to be managed: I added a fallback that re-calls the API on a cache miss, and since the results page — which aggregates every sub-page's result — initially showed the stale, pre-change cached value, I made each sub-page immediately refresh its cache entry on value change so the results page always reflects the latest value on entry.",
                "Switched to lazy building — removed the IndexedStack and changed it to conditionally render only the page currently being viewed. Since the test data is already loaded into the cache by then, opening a page for the first time only needs to build the widget from cached data, with no additional API call. Once a page widget is built, it's kept as-is (cached) afterward, so revisiting the same page doesn't rebuild the widget. As a result, I was able to greatly reduce the initial load at entry time without adding any delay to page transitions.",
              ],
            },
            {
              type: 'image',
              src: snsb3AppPerformance,
              alt: 'Test-screen entry performance: before vs. after',
            },
          ],
        },
        {
          title: 'Internal Infrastructure — Introducing a Developer Infrastructure MCP Server',
          skillKeywords: ['Spring Boot', 'MCP Protocol', 'Sentry API', 'CloudWatch'],
          role: 'Solo design and implementation',
          blocks: [
            { type: 'heading', text: 'Service Overview' },
            {
              type: 'paragraph',
              text:
                'An internal MCP server that connects AI directly to the internal infrastructure engineers repeatedly need to check during development — API docs, the DB, Sentry, CloudWatch, and the QA dashboard. Built on Spring Boot, it lets AI clients like Claude check API specs, query the DB, monitor errors and infrastructure, and review QA test results using nothing but natural-language requests.',
            },
            { type: 'heading', text: 'Implementation' },
            {
              type: 'list',
              items: [
                'Swagger integration tool — looks up the API spec directly to surface endpoints, parameters, and response shapes',
                'DB query tool — converts natural-language requests into SELECT queries. I initially validated this only at the code level, by enforcing SELECT and blacklisting keywords, but **there was a case where Claude bypassed the tool entirely and ran a query directly using DB credentials it had obtained separately**, which made clear that code-level defenses alone had a limit. I switched to **restricting the DB account itself to SELECT-only privileges**, so data changes are structurally impossible no matter what path is used to connect.',
                'Sentry/CloudWatch integration tool — directly queries recent error activity and infrastructure logs/metrics',
                'Internal QA dashboard integration tool — directly queries test results from the automated E2E QA server',
              ],
            },
            {
              type: 'image',
              src: mcpServerArchitecture,
              alt: 'Internal MCP server architecture',
            },
            {
              type: 'paragraph',
              text:
                'With AI able to reference API specs, DB data, and error status directly, we were able to significantly cut the time spent on repetitive lookup work even with a small team.',
            },
          ],
        },
        {
          title: 'Internal Infrastructure — Notion-Discord-AI Automated Bug-Handling Pipeline',
          skillKeywords: ['Node.js', 'AWS SQS', 'Discord Bot', 'Notion API'],
          role: 'Solo design and implementation',
          blocks: [
            { type: 'heading', text: 'Problem' },
            {
              type: 'paragraph',
              text:
                'Bug reports were managed in a Notion ticket DB, but it was hard to notice new bugs in real time, hand-offs to the responsible person weren\'t immediate, and there was repetitive manual work classifying and routing bugs. Since bug reports followed a fixed format — "description / reproduction steps / actual result / expected result" — I judged the process to be highly automatable.',
            },
            { type: 'heading', text: 'Design and Implementation' },
            {
              type: 'paragraph',
              text:
                'I designed a DB + AWS SQS architecture that supports state tracking, failure recovery, and horizontal Worker scaling. Since there were only a small number of AI Workers and it mattered that each job be processed exactly once, I judged that a single SQS Standard queue — which lets built-in queue features like retries and a DLQ be used as-is — was sufficient.',
            },
            { type: 'heading', text: 'Process Flow' },
            {
              type: 'list',
              ordered: true,
              items: [
                'Poll the Notion DB every 60 seconds to detect new/changed bugs → notify the Discord channel immediately',
                'Provide interactive buttons on the Discord message for repository selection, AI provider selection, and "resolve with AI"',
                'On button click, the backend enqueues the job to SQS, and an AI Worker picks it up by polling and processes it',
                'The AI Worker assembles the CLI command matching the selected provider (Claude / Gemini / Codex) and runs it non-interactively in the selected repository path. It parses the Notion bug report — written by the QA team in the fixed format (problem / reproduction steps / expected result / actual result) — into a prompt and hands it off',
              ],
            },
            {
              type: 'heading',
              text: 'Limitations and Improvement Direction — SQS Queue Thrashing',
            },
            {
              type: 'paragraph',
              text:
                "Since each AI Worker runs on a different machine, jobs that needed to go to a specific machine were delivered as SQS messages. But because SQS messages can't be inspected before being received — only after — a Worker that pulled a message meant for someone else's job would put it back on the queue. With the current small number of Workers this hasn't been a noticeable problem yet, but I anticipated it could lead to the following three problems as the number of Workers grows.",
            },
            {
              type: 'list',
              items: [
                'Queue thrashing — all Workers repeatedly pull and re-push messages, causing queue churn to explode well beyond the actual work being done',
                'Message starvation — because Workers other than the intended one keep pulling the message, it reaches the Worker that actually needs to process it late',
                "Possible duplicate consumption — receiving a message from SQS isn't the same as deleting it. A received message is only hidden from other Workers for a limited time, and if a Worker decides it's not its job and re-sends the payload without deleting the original message, the original reappears on the queue once its visibility timeout expires. As a result, messages pointing to the same job can end up duplicated on the queue and delivered to different Workers at the same time",
              ],
            },
            {
              type: 'paragraph',
              text: 'I considered two improvements that could be applied immediately.',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                "Move a message to the dead-letter queue (DLQ) once it's been returned too many times, to cut off infinite loops",
                'Instead of re-pushing a pulled message immediately, wait a set delay first, to reduce contention between Workers',
              ],
            },
            {
              type: 'paragraph',
              text:
                "Longer-term, I'm considering moving to a structure where each Worker consumes messages independently, eliminating contention altogether, and specifically I'm looking at the following two options.",
            },
            {
              type: 'list',
              items: [
                'An SNS topic combined with a per-Worker SQS queue',
                'Switching to Kafka, where topics and consumer groups allow independent per-Worker consumption',
              ],
            },
            {
              type: 'paragraph',
              text:
                "At the current scale of our internal infrastructure, the existing structure still meets requirements, so I'm improving it incrementally.",
            },
            {
              type: 'image',
              src: bugPipelineArchitecture,
              alt: 'Automated bug-report handling pipeline',
            },
          ],
        },
      ],
    },
    {
      title: 'DM System Engineering',
      period: '2025.04 ~ 2025.12',
      positionTitle: 'Developer',
      projects: [
        {
          title: 'Laser Evacuation Guide Real-time Control System',
          skillKeywords: [
            'Spring Boot',
            'MQTT',
            'MongoDB',
            'Redis',
            'MariaDB',
            'React',
            'Docker',
            'Grafana',
          ],
          role:
            'Solo design, implementation, and operation (delivered and operated at Celltrion and Diageo)',
          blocks: [
            { type: 'heading', text: 'Service Overview' },
            {
              type: 'paragraph',
              text:
                'A control system that collects sensor data in real time from laser evacuation guide lights installed throughout a building and remotely controls the devices. It has been delivered to and is in operation at large sites including Celltrion and Diageo, managing dozens of devices from a single platform.',
            },
            {
              type: 'image',
              src: laserSystemArchitecture,
              alt: 'Laser evacuation guide control system architecture',
            },
            {
              type: 'heading',
              text: 'Switching to MQTT — Real-time Control Performance Improvement',
            },
            {
              type: 'paragraph',
              text:
                "I judged that a connection architecture where server load doesn't scale proportionally with device count was necessary, so I adopted the MQTT pub/sub pattern. Messages are distributed per topic through the broker, so server load doesn't grow linearly as devices increase.",
            },
            {
              type: 'paragraph',
              text:
                'To prevent lost control commands, I applied QoS 1 to published messages, and if the broker connection drops, it retries reconnecting every 3 seconds and re-subscribes to topics on success. With a small number of devices and fast recovery being important, I chose a simple fixed-interval retry.',
            },
            { type: 'heading', text: 'Device Connection State Management' },
            {
              type: 'paragraph',
              text:
                "I needed to detect in real time whether any of the dozens of devices had lost communication. Since the MQTT-receiving thread and an @Scheduled thread access the same map concurrently, I implemented a connection-state management module that uses a ConcurrentHashMap to guarantee atomic concurrent access, records each device's last-communication timestamp, and every 10 seconds sweeps all devices, transitioning them to offline once they exceed the threshold (60 seconds).",
            },
            { type: 'heading', text: 'Device Control and Permission Management' },
            {
              type: 'paragraph',
              text:
                'Device control is implemented so that selecting a direction, angle, and alarm state on the control screen publishes a command to the target device over MQTT; the ESP32 receives it and forwards it to the STM32 over UART serial.',
            },
            { type: 'heading', text: 'Docker-based Multi-environment Deployment' },
            {
              type: 'paragraph',
              text:
                'Under the security policies of clients like Celltrion and Diageo, the system could only be installed on an air-gapped on-premise server with no internet access, while other clients required deployment to a cloud (AWS EC2) environment. The requirement was to deploy the same system to two different network environments.',
            },
            {
              type: 'paragraph',
              text:
                'I bundled the entire stack — React, Spring Boot, Nginx, MariaDB, MongoDB, Redis, and the MQTT broker — with Docker Compose so it could be deployed with the same configuration both on-premise and in the cloud. The only parts that differed by environment were the domain/SSL settings and whether external network access was allowed; the rest of the application configuration was reused as-is, minimizing extra work from environment differences when deploying to a new site.',
            },
            { type: 'heading', text: 'Sensor Data Retention Policy — Scheduled Deletion Batch' },
            {
              type: 'paragraph',
              text:
                'Sensor data accumulating every second in MongoDB was creating a growing storage burden over long-term operation. I implemented a scheduled batch that runs at 3 AM every day and bulk-deletes sensor data older than 6 months. The deletion count and duration are logged to the operations log so anomalies can be checked.',
            },
            {
              type: 'heading',
              text: 'Log Monitoring — Log Normalization and Promtail-based Collection',
            },
            {
              type: 'paragraph',
              text:
                'I normalized all application logs to JSON and defined a common format per event type, such as requests, MQTT, and DB. DB, MQTT, and request latency are automatically detected against thresholds and logged at WARN level; the normalized logs are collected by Promtail, ingested into Loki, and visualized on a Grafana dashboard to monitor slow queries, authentication errors, and device connection anomalies.',
            },
          ],
        },
      ],
    },
  ],
};

export default career;
