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
          descriptions: ['치매 진단용 표준화 신경심리검사(SNSB) 개발·서비스 기업'],
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
