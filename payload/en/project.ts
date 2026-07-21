import { IProject } from '../../component/project/IProject';

const project: IProject.Payload = {
  disable: false,
  list: [
    {
      title: 'SNSB3 Standardized Scoring Program',
      where: 'HBRC',
      startedAt: '2026-01',
      summary:
        'A web platform for collecting and scoring data for the SNSB3, a standardized neuropsychological test used for dementia diagnosis',
      descriptions: [
        {
          content:
            'Built a real-time test-taker registration status dashboard used by undergraduate examiners',
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
        },
      ],
      skillKeywords: ['Next.js', 'Spring Boot', 'PostgreSQL', 'ECS'],
    },
    {
      title: 'SNSB3 App',
      where: 'HBRC',
      startedAt: '2026-01',
      summary: 'An examiner-facing app for administering and scoring the SNSB3 test on a tablet',
      descriptions: [
        { content: 'Built a tablet app for examiners to administer and score the test' },
        {
          content:
            'Improved test-entry speed from 6 seconds to under 1 second by removing duplicate API calls and applying lazy loading',
        },
      ],
      skillKeywords: ['Flutter'],
    },
    {
      title: 'SNSB3 Batch Capture App',
      where: 'HBRC',
      startedAt: '2026-01',
      summary:
        'A companion app that photographs paper test sheets and batch-recognizes and organizes them',
      descriptions: [
        {
          content:
            'Fine-tuned an AI image recognition model and implemented image pre/post-processing',
        },
        {
          content:
            'Implemented real-time photo uploads to the SNSB3 app via push events using FCM and SNS',
        },
      ],
      skillKeywords: ['Flutter', 'OpenCV', 'FCM'],
    },
    {
      title: 'Internal Developer Infrastructure',
      where: 'HBRC',
      startedAt: '2026-01',
      descriptions: [
        { content: 'Built a Notion-Discord-AI based automated bug-handling pipeline' },
        {
          content:
            'Built an MCP server supporting Swagger(OpenAPI)-based API spec lookup, DB SELECT queries, CloudWatch/Sentry monitoring, the internal automated E2E QA server, and Notion integration',
          descriptions: [
            {
              content: 'Read blog post',
              href:
                'https://velog.io/@kimseungzzang/%EB%82%B4%EA%B0%80-%EC%82%AC%EB%82%B4-MCP-%EC%84%9C%EB%B2%84%EB%A5%BC-%EB%8F%84%EC%9E%85%ED%95%98%EA%B2%8C-%EB%90%9C-%EC%9D%B4%EC%9C%A0',
            },
          ],
        },
      ],
      skillKeywords: ['Spring Boot', 'DiscordBot', 'Claude CLI', 'SQS', 'Notion', 'Node.js'],
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
        },
        {
          content: 'Delivered and operated the system at real sites including Celltrion and Diageo',
        },
        {
          content:
            'Deployed identically to both air-gapped on-premise and cloud environments using Docker Compose',
        },
      ],
      skillKeywords: ['Spring Boot', 'MQTT', 'React', 'MariaDB', 'MongoDB', 'Redis', 'EC2'],
    },
  ],
};

export default project;
