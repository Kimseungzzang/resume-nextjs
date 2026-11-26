import { IProject } from '../../component/project/IProject';

const project: IProject.Payload = {
  disable: false,
  list: [
    {
      title: 'SNSB Testing Platform',
      where: 'HBRC',
      startedAt: '2026-01',
      summary:
        'A neuropsychological test (SNSB) platform for dementia diagnosis — one backend serving the standardization web, general (CMS) web, test app, and admin web',
      descriptions: [
        {
          content:
            'Refactored and unified the research (standardization) and general service APIs — split code that had grown separately per service along two axes, service and test type (SNSB-II/III), and added ArchUnit tests to CI',
          boldText: 'added ArchUnit tests to CI',
        },
        {
          content:
            'Automated DB migration dry-runs (apply → roll back, then compare row counts and hashes) and caught a rollback defect before production',
          boldText: 'caught a rollback defect before production',
        },
        {
          content:
            'Fixed change-history loss with a Transactional Outbox — records history in the same transaction and a separate history service ships it to S3; zero loss under forced server kills and S3 outages (previously 8,724 records lost on a forced kill)',
          boldText: 'zero loss',
        },
        {
          content:
            'In a k6 target-load test (900 users, 50 minutes), traced 1 failure out of 39,523 requests to a race between Tomcat keep-alive and the ALB idle timeout, and fixed the setting',
          boldText: 'a race between Tomcat keep-alive and the ALB idle timeout',
        },
        {
          content:
            'Predicted, from GC logs, the table size at which the test-taker delete API (which loaded the entire test table into memory) would run out of memory, and verified it with load tests (predicted ~360K rows, measured 350K–375K)',
          boldText: 'Predicted, from GC logs',
        },
        {
          content:
            'Fixed it with conditional queries and bulk UPDATEs — deleting one test-taker at 100K rows went from 700ms to 8ms; with 10 concurrent deletes, zero OOMs and Full GCs from 344 to 0',
          boldText: '700ms to 8ms',
        },
        {
          content:
            'Built a real-time test-taker registration status dashboard used by undergraduate examiners on the standardization web',
        },
        {
          content:
            'Resolved a capacity-overflow (race condition) issue that occurred during concurrent registration using a PostgreSQL Advisory Lock',
          boldText: 'capacity-overflow (race condition) issue',
          descriptions: [
            {
              content: 'Read blog post',
              href:
                'https://velog.io/@kimseungzzang/PostgreSQL-Advisory-Lock%EC%9D%B4-%EB%AD%94%EB%8D%B0',
            },
          ],
        },
        {
          content:
            'Eliminated response latency by using @TransactionalEventListener(AFTER_COMMIT) and @Async to send emails on a separate thread after the transaction commits',
          boldText: 'Eliminated response latency',
        },
      ],
      skillKeywords: ['Next.js', 'Spring Boot', 'PostgreSQL', 'ECS'],
    },
    {
      title: 'SNSB Test App',
      where: 'HBRC',
      startedAt: '2026-01',
      summary: 'An examiner-facing app for administering and scoring the SNSB test on a tablet',
      descriptions: [
        { content: 'Built a tablet app for examiners to administer and score the test' },
        {
          content:
            'On test entry, cut duplicate calls for the same data from 28 to 1 by sharing the in-flight request, and reduced entry latency with a new aggregate entry API and lazy page building',
          boldText: 'from 28 to 1 by sharing the in-flight request',
        },
      ],
      skillKeywords: ['Flutter'],
    },
    {
      title: 'SNSB Batch Capture App',
      where: 'HBRC',
      startedAt: '2026-01',
      summary:
        'A companion app that photographs paper test sheets and batch-recognizes and organizes them',
      descriptions: [
        {
          content:
            'Fine-tuned an AI image recognition model and implemented image pre/post-processing',
          boldText: 'Fine-tuned an AI image recognition model',
        },
        {
          content:
            'Implemented real-time photo uploads to the SNSB test app via push events using FCM and SNS',
        },
      ],
      skillKeywords: ['Flutter', 'OpenCV', 'FCM'],
    },
    {
      title: 'Internal Developer Infrastructure',
      where: 'HBRC',
      startedAt: '2026-01',
      descriptions: [
        {
          content: 'Built a Notion-Discord-AI based automated bug-handling pipeline',
          boldText: 'automated bug-handling pipeline',
        },
        {
          content:
            'Moved QA test cases into Playwright (web) and Maestro (mobile) scripts, and built a 24/7 E2E deployment verification system with a TC version/run history dashboard and a DB job queue with workers',
          boldText: '24/7 E2E deployment verification system',
        },
        {
          content:
            'Built an MCP server supporting Swagger(OpenAPI)-based API spec lookup, DB SELECT queries, CloudWatch/Sentry monitoring, the internal automated E2E QA server, and Notion integration',
          boldText: 'Built an MCP server',
          descriptions: [
            {
              content: 'Read blog post',
              href:
                'https://velog.io/@kimseungzzang/%EB%82%B4%EA%B0%80-%EC%82%AC%EB%82%B4-MCP-%EC%84%9C%EB%B2%84%EB%A5%BC-%EB%8F%84%EC%9E%85%ED%95%98%EA%B2%8C-%EB%90%9C-%EC%9D%B4%EC%9C%A0',
            },
          ],
        },
      ],
      skillKeywords: [
        'Spring Boot',
        'Discord Bot',
        'Claude CLI',
        'SQS',
        'Notion',
        'NestJS',
        'Playwright',
        'Maestro',
      ],
    },
    {
      title: 'Laser Evacuation Guide Real-time Control System',
      where: 'DM System Engineering',
      startedAt: '2025-04',
      endedAt: '2025-12',
      summary:
        'A control system for real-time monitoring and control of laser evacuation guide lights installed in buildings',
      descriptions: [
        {
          content:
            'Solely designed, built, and operated a web-based control system that collects sensor data from and controls laser evacuation guide lights installed throughout a building in real time',
          boldText: 'Solely designed, built, and operated',
        },
        {
          content: 'Delivered and operated the system at real sites including Celltrion and Diageo',
          boldText: 'Delivered and operated the system at real sites',
        },
        {
          content:
            'Deployed identically to both air-gapped on-premise and cloud environments using Docker Compose',
          boldText: 'Deployed identically to both air-gapped on-premise and cloud environments',
        },
      ],
      skillKeywords: ['Spring Boot', 'MQTT', 'React', 'MariaDB', 'MongoDB', 'Redis', 'EC2'],
    },
  ],
};

export default project;
