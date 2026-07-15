import { IProject } from '../component/project/IProject';

const project: IProject.Payload = {
  disable: false,
  list: [
    {
      title: 'SNSB3 표준화 채점 프로그램',
      where: '휴브알엔씨',
      startedAt: '2026-01',
      summary: '치매 진단용 표준 신경심리검사(SNSB3)의 데이터 수집·채점 웹 플랫폼',
      descriptions: [
        { content: '대학생 검사자들이 실시간으로 사용하는 수검자 등록 현황 대시보드 개발' },
        {
          content:
            'PostgreSQL Advisory Lock을 활용해 동시 등록 시 발생하는 정원 초과(Race Condition) 문제 해결',
          boldText: '정원 초과(Race Condition) 문제 해결',
          descriptions: [
            {
              content: '블로그 글 보기',
              href:
                'https://velog.io/@kimseungzzang/PostgreSQL-Advisory-Lock%EC%9D%B4-%EB%AD%94%EB%8D%B0',
            },
          ],
        },
        {
          content:
            '@TransactionalEventListener(AFTER_COMMIT)와 @Async를 활용해 트랜잭션 커밋 후 별도 스레드에서 이메일을 발송하도록 설계해 응답 지연 제거',
        },
      ],
      skillKeywords: ['Next.js', 'Spring Boot', 'PostgreSQL', 'ECS'],
    },
    {
      title: 'SNSB3 앱',
      where: '휴브알엔씨',
      startedAt: '2026-01',
      summary: 'SNSB3 검사를 태블릿으로 진행·채점하는 검사자용 앱',
      descriptions: [
        { content: '검사자용 태블릿 검사·채점 앱 개발' },
        {
          content: 'API 중복 호출 제거 및 Lazy Loading 적용으로 검사 진입 속도 6초 → 1초 미만 개선',
        },
      ],
      skillKeywords: ['Flutter'],
    },
    {
      title: 'SNSB3 모아찍기 앱',
      where: '휴브알엔씨',
      startedAt: '2026-01',
      summary: '지필 검사지를 촬영해 일괄 인식·정리하는 보조 앱',
      descriptions: [
        { content: 'AI 이미지 인식 모델 파인튜닝 및 이미지 전후처리 기능 구현' },
        { content: 'FCM, SNS를 이용한 푸시 이벤트를 통해 SNSB3 앱에 실시간 사진 업로드 기능 구현' },
      ],
      skillKeywords: ['Flutter', 'OpenCV', 'FCM'],
    },
    {
      title: '사내 개발 인프라',
      where: '휴브알엔씨',
      startedAt: '2026-01',
      descriptions: [
        { content: 'Notion-Discord-AI 기반 버그 자동 처리 파이프라인 구축' },
        {
          content:
            'Swagger(OpenAPI) 기반 API 명세 조회, DB SELECT 조회, CloudWatch·Sentry 모니터링, 사내 자동화 E2E QA 서버, Notion 연동을 지원하는 MCP 서버 개발',
          descriptions: [
            {
              content: '블로그 글 보기',
              href:
                'https://velog.io/@kimseungzzang/%EB%82%B4%EA%B0%80-%EC%82%AC%EB%82%B4-MCP-%EC%84%9C%EB%B2%84%EB%A5%BC-%EB%8F%84%EC%9E%85%ED%95%98%EA%B2%8C-%EB%90%9C-%EC%9D%B4%EC%9C%A0',
            },
          ],
        },
      ],
      skillKeywords: ['Spring Boot', 'DiscordBot', 'Claude CLI', 'SQS', 'Notion', 'Node.js'],
    },
    {
      title: '레이저 피난 유도기 실시간 관제 시스템',
      where: '디엠시스템엔지니어링',
      startedAt: '2025-04',
      endedAt: '2025-12',
      summary: '건물에 설치된 레이저 피난 유도기를 실시간 모니터링·제어하는 관제 시스템',
      descriptions: [
        {
          content:
            '건물 내 설치된 레이저 피난 유도기의 센서 데이터를 실시간 수집·제어하는 웹 기반 관제 시스템을 1인으로 설계·구현·운영',
        },
        { content: '셀트리온·디아지오 등 실사업장에 납품 및 운영' },
        { content: 'Docker Compose 기반으로 폐쇄망·클라우드 환경에 동일하게 배포' },
      ],
      skillKeywords: ['Spring Boot', 'MQTT', 'React', 'MariaDB', 'MongoDB', 'Redis', 'EC2'],
    },
  ],
};

export default project;
