import { IIntroduce } from '../../component/introduce/IIntroduce';
import { lastestUpdatedAt } from '../../package.json';

const introduce: IIntroduce.Payload = {
  disable: false,

  contents: [
    {
      content:
        'I currently own the backend server shared by the standardization web, general (CMS) web, and test app of a neuropsychological test (SNSB) platform for dementia diagnosis, and have experience across web, app, and backend services from design through operation.',
      boldText:
        'the backend server shared by the standardization web, general (CMS) web, and test app',
    },
    {
      content:
        'While production data was still too small to expose it, I used load tests and GC logs to calculate when an OOM would hit and fixed it in advance, and built a structure that loses zero change-history records even when the server is force-killed.',
      boldText: 'calculate when an OOM would hit and fixed it in advance',
    },
    {
      content:
        'To grow as a backend developer around concurrency issues and traffic load, I went beyond internal projects and built a ticketing program myself to load-test its waiting queue, getting hands-on experience with high-traffic processing.',
    },
    {
      content:
        "By building things like an automated trading agent, an internal MCP server, and a session-management pipeline, and by serving open-model LLMs on GPUs and tuning VRAM myself to study AI infrastructure, I'm adapting to a development environment that keeps changing in the AI era.",
      boldText: 'adapting to a development environment that keeps changing',
    },
  ],
  sign: 'Seungjun Kim',
  latestUpdated: lastestUpdatedAt,
};

export default introduce;
