import { IIntroduce } from '../component/introduce/IIntroduce';
import { lastestUpdatedAt } from '../package.json';

const introduce: IIntroduce.Payload = {
  disable: false,

  contents: [
    '현재 치매 진단용 표준 신경심리검사(SNSB3) 플랫폼의 백엔드 개발을 맡고 있으며, 웹·앱·백엔드 서비스를 설계부터 운영까지 경험했습니다.',
    'count 컬럼 없이 테이블 조인 집계로 인원을 세야 하는 동시 등록 레이스 컨디션은 PostgreSQL Advisory Lock으로, 순서 보장이 필요 없는 이메일 발송 이벤트는 FIFO 대신 일반 SQS로 처리하는 등 상황에 맞는 기술을 찾아 적용합니다.',
    '동시성 문제, 트래픽 부하 등 백엔드 개발자로서 성장하기 위해 사내 프로젝트뿐 아니라 Redis를 직접 구현해 티케팅 프로그램의 부하테스트를 진행하며 Redis의 특징을 직접 경험해보기도 했습니다.',
    '자동매매 에이전트, 사내 MCP 서버, 세션 관리 파이프라인 등을 직접 만들며 AI 시대에 맞춰 변화하는 개발 환경에도 적응하고 있으며, 주 1회 사내 기술 스터디를 꾸준히 진행하며 배움을 이어가고 있습니다.',
  ],
  sign: '김승준',
  latestUpdated: lastestUpdatedAt,
};

export default introduce;
