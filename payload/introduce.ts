import { IIntroduce } from '../component/introduce/IIntroduce';
import { lastestUpdatedAt } from '../package.json';

const introduce: IIntroduce.Payload = {
  disable: false,

  contents: [
    {
      content:
        '현재 치매 진단용 신경심리검사(SNSB) 플랫폼에서 표준화 웹·일반(CMS) 웹·검사 앱이 함께 쓰는 백엔드 서버를 맡고 있으며, 웹·앱·백엔드 서비스를 설계부터 운영까지 경험했습니다.',
      boldText: '표준화 웹·일반(CMS) 웹·검사 앱이 함께 쓰는 백엔드 서버',
    },
    {
      content:
        '검사 데이터는 한 건도 어긋나면 안 되기에 정합성과 동시성을 먼저 챙깁니다. 변경 이력을 Transactional Outbox로 같은 트랜잭션에 묶어 서버가 강제 종료돼도 유실 0건으로 만들었고, 동시 등록 시 정원이 초과되던 문제는 PostgreSQL Advisory Lock으로 해결했습니다.',
      boldText: '정합성과 동시성',
    },
    {
      content:
        '배포와 운영을 직접 맡으며, 지표를 근거로 리소스와 구조를 판단합니다. GC 로그와 부하 테스트 지표를 분석해 아직 드러나지 않던 OOM 한계를 미리 계산하고 조회 구조를 바꿨습니다.',
      boldText: '지표를 근거로 리소스와 구조를 판단합니다',
    },
    {
      content:
        '반복되는 일은 팀이 함께 쓰는 도구로 자동화합니다. API 명세·DB·모니터링을 한데 묶은 사내 MCP 서버와, QA 테스트 케이스를 24시간 자동으로 돌리는 E2E QA 대시보드를 만들었습니다.',
      boldText: '팀이 함께 쓰는 도구로 자동화',
    },
  ],
  sign: '김승준',
  latestUpdated: lastestUpdatedAt,
};

export default introduce;
