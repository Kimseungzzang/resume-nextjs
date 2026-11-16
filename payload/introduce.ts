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
        '운영 데이터가 작아 아직 드러나지 않던 OOM 위험을 부하 테스트와 GC 로그로 언제 터질지 계산해 미리 막고, 서버가 강제 종료돼도 변경 이력 유실 0건인 구조를 만들었습니다.',
      boldText: '언제 터질지 계산해 미리 막고',
    },
    {
      content:
        '동시성 문제, 트래픽 부하 등 백엔드 개발자로서 성장하기 위해 사내 프로젝트뿐 아니라 티케팅 프로그램을 직접 만들어 대기열 부하 테스트를 진행하며 대용량 트래픽 처리를 경험해보기도 했습니다.',
    },
    {
      content:
        '자동매매 에이전트, 사내 MCP 서버, 세션 관리 파이프라인 등을 직접 만들고, AI 환경을 공부하기 위해 GPU 환경에서 오픈 모델 LLM을 직접 서빙하며 VRAM 튜닝도 해 보는 등 AI 시대에 맞춰 변화하는 개발 환경에도 적응하고 있습니다.',
      boldText: '변화하는 개발 환경에도 적응',
    },
  ],
  sign: '김승준',
  latestUpdated: lastestUpdatedAt,
};

export default introduce;
