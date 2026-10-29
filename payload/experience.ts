import { IExperience } from '../component/experience/IExperience';

const experience: IExperience.Payload = {
  disable: false,
  disableTotalPeriod: false,
  list: [
    {
      title: '휴브알엔씨',
      positions: [
        {
          title: '개발자',
          startedAt: '2026-01',
          descriptions: [
            '치매 진단용 표준화 신경심리검사(SNSB) 개발·서비스 기업',
            'STD/CMS 통합 리팩토링 — 출처와 검사 종류를 두 축으로 분리, 엔드포인트 140개 → 87개, 마이그레이션 왕복 리허설로 롤백 결함 사전 발견',
            'Transactional Outbox로 변경 이력 유실 해결 — 서버 강제 종료 시 유실 8,724건 → 0건, 목표 부하(k6 900명) 저장 p95 10ms',
            '수검자 삭제 API의 OOM 장애 원인을 부하 테스트로 규명·개선 — 동시 삭제 시 서버 전체가 멈추던 문제 해소, 응답 700ms → 8ms',
          ],
        },
      ],
    },
    {
      title: '디엠시스템엔지니어링',
      positions: [
        {
          title: '개발자',
          startedAt: '2025-04',
          endedAt: '2025-12',
          descriptions: ['레이저 피난 유도기 등 소방·안전 설비 제조 및 관제 시스템 개발 기업'],
        },
      ],
    },
  ],
};

export default experience;
