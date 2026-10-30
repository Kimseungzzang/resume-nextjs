import { IProject } from '../component/project/IProject';

const project: IProject.Payload = {
  disable: false,
  list: [
    {
      title: 'SNSB 검사 플랫폼',
      where: '휴브알엔씨',
      startedAt: '2026-01',
      summary:
        '치매 진단용 신경심리검사(SNSB) 플랫폼 — 하나의 백엔드로 표준화 웹·일반(CMS) 웹·검사 앱·관리자 웹을 서비스',
      descriptions: [
        {
          content:
            '연구용(표준화)·일반 서비스 API 통합 리팩토링 — 서비스마다 따로 자라 중복되던 코드를 서비스 구분과 검사 종류(SNSB-II·III) 두 축으로 분리, ArchUnit 테스트 도입 및 CI 적용, 엔드포인트 140개 → 87개',
          boldText: '엔드포인트 140개 → 87개',
        },
        {
          content:
            'DB 마이그레이션 dry-run 자동화(적용 → 롤백 후 행 수·해시 비교)로 롤백 결함을 운영 전에 발견',
          boldText: '롤백 결함을 운영 전에 발견',
        },
        {
          content:
            'Transactional Outbox로 변경 이력 유실 해결 — 같은 트랜잭션에 기록 후 별도 이력 서비스가 S3로 전달, 서버 강제 종료·S3 장애 조건에서 유실 0건 (기존 강제 종료 시 8,724건 유실)',
          boldText: '유실 0건',
        },
        {
          content:
            'k6 목표 부하 테스트(900명·50분)에서 39,523건 중 1건 실패를 추적해 Tomcat keep-alive와 ALB idle timeout 경합을 찾아 설정 반영',
          boldText: 'Tomcat keep-alive와 ALB idle timeout 경합',
        },
        {
          content:
            '수검자 삭제 API가 검사 테이블 전체를 메모리에 올려 OOM이 나는 한계를 GC 로그로 계산해 예측하고, 부하 테스트로 검증 (예측 약 36만 행, 실측 35만~37.5만 행)',
          boldText: 'GC 로그로 계산해 예측',
        },
        {
          content:
            '조건 조회·벌크 UPDATE로 개선 — 10만 행 기준 1명 삭제 700ms → 8ms, 동시 삭제 10건에서 OOM 0건·Full GC 344회 → 0회',
          boldText: '700ms → 8ms',
        },
        {
          content:
            '표준화 웹에서 대학생 검사자들이 실시간으로 사용하는 수검자 등록 현황 대시보드 개발',
        },
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
          boldText: '응답 지연 제거',
        },
      ],
      skillKeywords: ['Next.js', 'Spring Boot', 'PostgreSQL', 'ECS'],
    },
    {
      title: 'SNSB 검사 앱',
      where: '휴브알엔씨',
      startedAt: '2026-01',
      summary: 'SNSB 검사를 태블릿으로 진행·채점하는 검사자용 앱',
      descriptions: [
        { content: '검사자용 태블릿 검사·채점 앱 개발' },
        {
          content:
            '검사 진입 시 같은 데이터를 28번 부르던 중복 API 호출을 요청 공유로 1회로 줄이고, 진입용 집계 API 신설과 페이지 지연 생성(Lazy 빌드)으로 진입 지연 개선',
          boldText: '요청 공유로 1회',
        },
      ],
      skillKeywords: ['Flutter'],
    },
    {
      title: 'SNSB 모아찍기 앱',
      where: '휴브알엔씨',
      startedAt: '2026-01',
      summary: '지필 검사지를 촬영해 일괄 인식·정리하는 보조 앱',
      descriptions: [
        {
          content: 'AI 이미지 인식 모델 파인튜닝 및 이미지 전후처리 기능 구현',
          boldText: 'AI 이미지 인식 모델 파인튜닝',
        },
        {
          content:
            'FCM, SNS를 이용한 푸시 이벤트를 통해 SNSB 검사 앱에 실시간 사진 업로드 기능 구현',
        },
      ],
      skillKeywords: ['Flutter', 'OpenCV', 'FCM'],
    },
    {
      title: '사내 개발 인프라',
      where: '휴브알엔씨',
      startedAt: '2026-01',
      descriptions: [
        {
          content: 'Notion-Discord-AI 기반 버그 자동 처리 파이프라인 구축',
          boldText: '버그 자동 처리 파이프라인',
        },
        {
          content:
            'Swagger(OpenAPI) 기반 API 명세 조회, DB SELECT 조회, CloudWatch·Sentry 모니터링, 사내 자동화 E2E QA 서버, Notion 연동을 지원하는 MCP 서버 개발',
          boldText: 'MCP 서버 개발',
          descriptions: [
            {
              content: '블로그 글 보기',
              href:
                'https://velog.io/@kimseungzzang/%EB%82%B4%EA%B0%80-%EC%82%AC%EB%82%B4-MCP-%EC%84%9C%EB%B2%84%EB%A5%BC-%EB%8F%84%EC%9E%85%ED%95%98%EA%B2%8C-%EB%90%9C-%EC%9D%B4%EC%9C%A0',
            },
          ],
        },
      ],
      skillKeywords: ['Spring Boot', 'Discord Bot', 'Claude CLI', 'SQS', 'Notion', 'NestJS'],
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
          boldText: '1인으로 설계·구현·운영',
        },
        { content: '셀트리온·디아지오 등 실사업장에 납품 및 운영', boldText: '실사업장에 납품' },
        {
          content: 'Docker Compose 기반으로 폐쇄망·클라우드 환경에 동일하게 배포',
          boldText: '폐쇄망·클라우드 환경에 동일하게 배포',
        },
      ],
      skillKeywords: ['Spring Boot', 'MQTT', 'React', 'MariaDB', 'MongoDB', 'Redis', 'EC2'],
    },
  ],
};

export default project;
