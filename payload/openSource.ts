import { IOpenSource } from '../component/openSource/IOpenSource';

const openSource: IOpenSource.Payload = {
  disable: false,
  list: [
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
      title: 'Claude Code 세션 유지 파이프라인',
      descriptions: [
        { content: '여러 기기 간 작업 컨텍스트를 GitHub로 동기화하는 커스텀 스킬 모음' },
        {
          content: 'github.com/Kimseungzzang/zzang-claude-skills',
          href: 'https://github.com/Kimseungzzang/zzang-claude-skills',
        },
      ],
    },
    {
      title: '대용량 트래픽 티케팅 시스템',
      descriptions: [
        { content: 'MSA 구조와 대용량 트래픽 처리를 학습하기 위한 티케팅 프로젝트' },
        { content: 'k6를 활용해 동일 머신에서 1만 RPS 규모의 대기열 큐 부하테스트 수행' },
        {
          content:
            '입장 처리 로직의 레이스 컨디션으로 수용 한도(1,000명)를 3배(3,000명)까지 초과하는 버그를 실측 발견, 낙관적 락으로 재설계해 초과 없이 정확성 확보',
          boldText: '수용 한도(1,000명)를 3배(3,000명)까지 초과하는 버그를 실측 발견',
        },
        {
          content:
            '고정 3초 폴링 → 순번 기반 동적 폴링으로 전환해 폴링 트래픽 44% 감소',
        },
        {
          content: 'Redis를 직접 구현하고, real Redis와 처리량·지연 비교 분석',
          descriptions: [
            {
              content:
                '자체 구현은 목표 1,000 req/s부터 처리량·지연 급격 저하, real Redis는 9,583 req/s(p95 284ms)까지 처리',
            },
          ],
        },
        {
          content: 'github.com/Kimseungzzang/ticketing',
          href: 'https://github.com/Kimseungzzang/ticketing',
        },
      ],
    },
  ],
};

export default openSource;
