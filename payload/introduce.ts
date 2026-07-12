import { IIntroduce } from '../component/introduce/IIntroduce';
import { lastestUpdatedAt } from '../package.json';

const introduce: IIntroduce.Payload = {
  disable: false,

  contents: [
    '백엔드를 기반으로 하지만 AI를 활용한 풀스택 개발이 가능한 개발자입니다. 웹·앱·백엔드 서비스를 설계부터 운영까지 경험했으며, AI 시대에 맞춰 변화하는 개발 환경에 적응하며 개발하고 있습니다.',
  ],
  sign: '김승준',
  latestUpdated: lastestUpdatedAt,
};

export default introduce;
