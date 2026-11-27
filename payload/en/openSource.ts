import { IOpenSource } from '../../component/openSource/IOpenSource';

const openSource: IOpenSource.Payload = {
  disable: false,
  list: [
    {
      title: 'Trading Gym — AI Investment Coaching Agent',
      descriptions: [
        {
          content:
            'Entry for the 2026 Financial AI Challenge (Beyond Imagination, Into Reality: The Future of Finance Powered by AI)',
          boldText: '2026 Financial AI Challenge',
        },
        {
          content:
            'An investing-education service where users experience risks like leverage and forced liquidation in advance through mock trading on real market prices, and AI diagnoses their trading habits and links them to tailored learning and another attempt',
        },
        {
          content:
            "Built a RAG knowledge base from public financial-education materials such as the Financial Supervisory Service's e-Financial Education Center, providing an AI chat that cites its sources and personalized quizzes based on the diagnosis",
        },
        {
          content: 'github.com/ghals5737/trading-gym',
          href: 'https://github.com/ghals5737/trading-gym',
        },
      ],
    },
    {
      title: 'AI Autonomous Trading System',
      descriptions: [
        {
          content:
            'A trading agent where AI autonomously handles everything from price/indicator analysis to trade decisions',
        },
        {
          content:
            'Implemented a tool-use agent loop where the LLM makes decisions and executes only through 18 self-defined tools',
        },
        {
          content:
            'Blocked non-deterministic LLM failure modes — missing pre-execution confirmation, response hallucination, and arbitrary code execution risk in conditional expressions — with executor-level guardrails',
        },
        {
          content:
            'Implemented an autonomous processing pipeline that re-invokes the agent loop through a separate queue when external events occur, re-evaluating the situation and carrying through to execution without human intervention',
        },
        {
          content: 'github.com/Kimseungzzang/quant',
          href: 'https://github.com/Kimseungzzang/quant',
        },
      ],
    },
    {
      title: 'Claude Code Session Persistence Pipeline',
      descriptions: [
        {
          content:
            'A collection of custom skills that sync work context across multiple devices via GitHub',
        },
        {
          content: 'github.com/Kimseungzzang/zzang-claude-skills',
          href: 'https://github.com/Kimseungzzang/zzang-claude-skills',
        },
        {
          content: 'Read blog post',
          href:
            'https://velog.io/@kimseungzzang/%EB%82%98%EB%A7%8C%EC%9D%98-AI-%EC%9B%8C%ED%81%AC-%ED%94%8C%EB%A1%9C%EC%9A%B0-%EB%A7%8C%EB%93%9C%EB%8A%94-%EB%B0%A9%EB%B2%95',
        },
      ],
    },
  ],
};

export default openSource;
