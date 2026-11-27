import { IOpenSource } from '../component/openSource/IOpenSource';

const openSource: IOpenSource.Payload = {
  disable: false,
  list: [
    {
      title: '트레이딩 짐 — AI 투자 코칭 에이전트',
      descriptions: [
        {
          content: '2026 금융 AI Challenge(상상을 넘어 실제로, AI로 움직이는 금융의 미래) 출품작',
          boldText: '2026 금융 AI Challenge',
        },
        {
          content:
            '실제 시세 기반 모의투자로 레버리지·반대매매 같은 위험을 미리 겪어 보고, AI가 매매 습관을 진단해 맞춤 학습과 재도전까지 잇는 투자 교육 서비스',
        },
        {
          content:
            '금융감독원 e-금융교육센터 등 공공 금융교육 자료를 RAG 지식베이스로 구축해, 출처를 인용하는 AI 채팅과 진단 결과 기반 맞춤 퀴즈 제공',
        },
        {
          content: 'github.com/ghals5737/trading-gym',
          href: 'https://github.com/ghals5737/trading-gym',
        },
      ],
    },
    {
      title: 'AI 자율 트레이딩 시스템',
      descriptions: [
        { content: 'AI가 시세·지표 분석부터 매매 판단까지 자율 수행하는 트레이딩 에이전트' },
        {
          content: 'LLM이 판단하고, 자체 정의한 18개 툴로만 실행하는 tool-use 에이전트 루프 구현',
        },
        {
          content:
            '실행 전 확인 절차 누락, 응답 환각(hallucination), 조건식의 임의 코드 실행 위험 등 LLM의 비결정적 오작동을 실행기 레벨 가드레일로 차단',
        },
        {
          content:
            '외부 이벤트 발생 시 별도 큐로 에이전트 루프를 재호출해, 사람 개입 없이 상황을 다시 판단하고 실행까지 이어지는 자율 처리 파이프라인 구현',
        },
        {
          content: 'github.com/Kimseungzzang/quant',
          href: 'https://github.com/Kimseungzzang/quant',
        },
      ],
    },
    {
      title: 'AI 에이전트 세션 유지 파이프라인',
      descriptions: [
        { content: '여러 기기 간 작업 컨텍스트를 GitHub로 동기화하는 커스텀 스킬 모음' },
        {
          content: 'github.com/Kimseungzzang/zzang-claude-skills',
          href: 'https://github.com/Kimseungzzang/zzang-claude-skills',
        },
        {
          content: '블로그 글 보기',
          href:
            'https://velog.io/@kimseungzzang/%EB%82%98%EB%A7%8C%EC%9D%98-AI-%EC%9B%8C%ED%81%AC-%ED%94%8C%EB%A1%9C%EC%9A%B0-%EB%A7%8C%EB%93%9C%EB%8A%94-%EB%B0%A9%EB%B2%95',
        },
      ],
    },
  ],
};

export default openSource;
