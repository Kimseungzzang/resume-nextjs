import { IOpenSource } from '../../component/openSource/IOpenSource';

const openSource: IOpenSource.Payload = {
  disable: false,
  list: [
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
    {
      title: 'High-Traffic Ticketing System',
      descriptions: [
        {
          content:
            'A ticketing project built to learn MSA architecture and high-traffic processing',
        },
        {
          content:
            'Ran load tests on the waiting queue at a scale of 10,000 RPS, driving k6 from a separate machine over the internal network',
        },
        {
          content:
            'Empirically discovered a bug where a race condition in the entry-processing logic caused the capacity limit (1,000) to be exceeded by up to 3x (3,000). Redesigned it from "read the counter, then decide" to deciding on the return value of an atomic INCR, compensating with a DECR rollback when the cap is exceeded, so the limit holds even as instances scale out',
          boldText:
            'Empirically discovered a bug where a race condition in the entry-processing logic caused the capacity limit (1,000) to be exceeded by up to 3x (3,000)',
        },
        {
          content:
            'Reduced polling traffic by 44% by switching from fixed 3-second polling to dynamic polling based on queue position',
        },
        {
          content: 'Implemented Redis myself and compared throughput/latency against real Redis',
          descriptions: [
            {
              content:
                'My own implementation degraded sharply in throughput/latency starting around the 1,000 req/s target, while real Redis handled up to 9,583 req/s (p95 284ms)',
            },
            {
              content:
                'Built RESP protocol parsing and a skip-list-based Sorted Set on top of a Netty event loop. I attribute the performance gap to how the Redis client handles TCP socket connections and to data-structure differences, and am currently verifying this by profiling',
            },
          ],
        },
        {
          content: 'github.com/Kimseungzzang/ticketing',
          href: 'https://github.com/Kimseungzzang/ticketing',
        },
        {
          content: 'Read blog post',
          href: 'https://velog.io/@kimseungzzang/Temp-Title-tkcylmzb',
        },
      ],
    },
  ],
};

export default openSource;
