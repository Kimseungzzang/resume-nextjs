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
        'Test data cannot be off by even a single record, so I put data consistency and concurrency first. I tied change history to the same transaction with a Transactional Outbox so that zero records are lost even when the server is force-killed, and fixed the capacity overrun that occurred on concurrent registration with a PostgreSQL Advisory Lock.',
      boldText: 'data consistency and concurrency',
    },
    {
      content:
        'I handle deployment and operation myself, and I use metrics to make resource and architecture decisions. By analyzing GC logs and load-test metrics, I calculated an OOM limit that had not yet surfaced and changed the query structure before it could hit.',
      boldText: 'I use metrics to make resource and architecture decisions',
    },
    {
      content:
        'I automate repetitive work into tools the whole team uses. I built an internal MCP server that brings API specs, the database, and monitoring together, and an E2E QA dashboard that runs QA test cases automatically around the clock.',
      boldText: 'automate repetitive work into tools the whole team uses',
    },
  ],
  sign: 'Seungjun Kim',
  latestUpdated: lastestUpdatedAt,
};

export default introduce;
