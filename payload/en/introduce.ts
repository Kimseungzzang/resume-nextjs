import { IIntroduce } from '../../component/introduce/IIntroduce';
import { lastestUpdatedAt } from '../../package.json';

const introduce: IIntroduce.Payload = {
  disable: false,

  contents: [
    {
      content:
        'I currently handle backend development for a standardized neuropsychological test (SNSB3) platform for dementia diagnosis, and have experience across web, app, and backend services from design through operation.',
    },
    {
      content:
        "I look for the right technology for each situation: I use PostgreSQL Advisory Locks for concurrent-registration race conditions where headcount must be counted via table-join aggregation rather than a count column, and I use a plain SQS queue instead of FIFO for queue tasks that don't need ordering guarantees.",
      boldText: 'look for the right technology for each situation',
    },
    {
      content:
        "To grow as a backend developer around concurrency issues and traffic load, I went beyond internal projects and implemented Redis myself to run load tests on a ticketing program, experiencing Redis's characteristics firsthand.",
    },
    {
      content:
        "By building things like an automated trading agent, an internal MCP server, and a session-management pipeline, I'm adapting to a development environment that keeps changing in the AI era, and I keep learning through a weekly internal tech study.",
      boldText: 'adapting to a development environment that keeps changing',
    },
  ],
  sign: 'Seungjun Kim',
  latestUpdated: lastestUpdatedAt,
};

export default introduce;
