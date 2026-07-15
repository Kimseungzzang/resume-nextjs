import { ICareer } from '../component/career/ICareer';
import snsb3DashboardLock from '../asset/career/snsb3-dashboard-lock.png';
import snsb3EmailArchitecture from '../asset/career/snsb3-email-architecture.png';
import snsb3AppPerformance from '../asset/career/snsb3-app-performance.png';
import mcpServerArchitecture from '../asset/career/mcp-server-architecture.png';
import bugPipelineArchitecture from '../asset/career/bug-pipeline-architecture.png';
import laserSystemArchitecture from '../asset/career/laser-system-architecture.png';
import otaUpdateFlow from '../asset/career/ota-update-flow.png';
import otaFlashMemory from '../asset/career/ota-flash-memory.png';
import laserSystemScreenshot from '../asset/career/laser-system-screenshot.png';

const career: ICareer.Payload = {
  disable: false,
  companies: [
    {
      title: '휴브알엔씨',
      period: '2026.01 ~ 현재',
      positionTitle: '개발자',
      projects: [
        {
          title: 'SNSB3 표준화 채점 프로그램 — 수검자 현황 대시보드 개발',
          skillKeywords: ['Spring Boot', 'PostgreSQL'],
          role: '2인 팀 합류 · 수검자 대시보드 파트 단독 담당',
          blocks: [
            { type: 'heading', text: '서비스 정의' },
            {
              type: 'paragraph',
              text:
                'SNSB3는 치매 진단을 위한 표준화 신경심리검사 도구입니다. 전국 임상 전공 대학생들이 수검자를 직접 검사하고 결과를 입력·채점하는 웹 기반 데이터 수집 플랫폼으로, 대규모 임상 데이터 축적을 목적으로 구축됐습니다.',
            },
            { type: 'heading', text: '문제 상황' },
            {
              type: 'paragraph',
              text:
                'SNSB3 검사는 나이대·성별·교육년수별로 수집해야 하는 수검자 수가 사전에 정해져 있습니다. 좌석 예매처럼 각 그룹마다 정원이 고정되어 있어, 해당 정원을 초과하면 데이터 편향이 생기므로 초과 등록을 반드시 차단해야 했습니다.',
            },
            {
              type: 'paragraph',
              text:
                '수검자 현황 대시보드는 "현재 등록 인원 / 제한 인원" 형태로 표시되며, 제한 인원 초과를 막기 위해 등록 요청 시 현재 인원을 조회 후 비교하는 방식으로 검증하고 있었습니다.',
            },
            {
              type: 'paragraph',
              text:
                '그러나 동시에 여러 요청이 들어올 경우, 두 요청이 모두 "9/10" 상태를 읽고 검증을 통과한 뒤 각각 등록을 수행해 최종 결과가 "11/10"이 되는 Race Condition이 발생할 수 있었습니다.',
            },
            { type: 'heading', text: '기술 선택 과정' },
            {
              type: 'list',
              ordered: true,
              items: [
                '처음에는 PostgreSQL의 SELECT FOR UPDATE(비관적 락)를 검토했습니다. 그러나 등록 인원이 단순 count 컬럼이 아닌 수검자 테이블·담당 직원 테이블·소속 기관 테이블의 JOIN 기반 집계 쿼리로 계산되는 구조였기 때문에, FOR UPDATE 시 JOIN으로 연결된 담당 직원·소속 기관 테이블처럼 여러 그룹이 공유하는 테이블의 행에까지 락이 걸려, 서로 다른 검사 그룹 간에도 불필요한 락 경합이 발생할 수 있다는 문제가 있었습니다.',
                'Redis의 DECR 명령으로 카운터를 원자적으로 차감하는 방식도 고려했습니다. 그러나 이 방식은 PostgreSQL과 별도로 Redis에 카운터 상태를 추가로 두고 두 저장소 간 정합성을 맞춰야 하는데, 현재 동시 등록 트래픽 규모에서는 이 정도의 인프라를 추가할 필요가 없다고 판단해 적용하지 않았습니다.',
                'UPDATE ... WHERE count < limit 형태의 조건부 업데이트도 검토했습니다. 이 방식은 DB의 row-level 락만으로 원자적으로 처리되어 별도 락 없이도 정원 초과를 막을 수 있다는 장점이 있습니다. 다만 이를 적용하려면 현재 인원을 별도의 카운터 컬럼으로 새로 관리해야 하고, 수검자 취소·변경 등 다른 경로로 데이터가 바뀔 때마다 이 카운터를 JOIN 집계 결과와 항상 일치시켜야 하는 동기화 문제가 새로 생겨, 기존 데이터 모델을 바꾸지 않고는 적용하기 어려웠습니다.',
                '이를 해결하기 위해 PostgreSQL의 pg_advisory_xact_lock을 선택했습니다. pg_try_advisory_xact_lock 같은 논블로킹 방식도 검토했으나, 순서 보장이 필요하고 락 경합이 빈번하지 않을 것으로 예상되어 블로킹 방식인 pg_advisory_xact_lock을 사용했습니다. 이 방식은 DB row가 아닌 애플리케이션이 정의한 임의의 키 단위로 락을 획득할 수 있어, 기존 JOIN 집계 쿼리 로직은 그대로 둔 채 동일 검사 그룹에 대한 요청만 직렬화하고 관련 없는 그룹 간의 락 경합을 최소화할 수 있었습니다.',
              ],
            },
            { type: 'heading', text: '구현 방식' },
            {
              type: 'list',
              items: [
                '검사 그룹을 구성하는 성별·연령대·학력 속성을 문자열로 이어붙인 뒤 SHA-256으로 해싱해 정수 락 키로 변환 (그룹을 대표하는 별도 PK 컬럼이 없어, 속성 조합 자체를 키로 사용)',
              ],
            },
            {
              type: 'code',
              code: `fun lockKeyOf(gender: Gender, ageGroup: String, educationLevel: String): Long {
    val key = listOf(gender.name, ageGroup, educationLevel).joinToString("|")
    val digest = MessageDigest.getInstance("SHA-256").digest(key.toByteArray())
    return ByteBuffer.wrap(digest.copyOfRange(0, Long.SIZE_BYTES)).long
}`,
            },
            {
              type: 'list',
              items: [
                '계산된 락 키로 pg_advisory_xact_lock(lockKey) 획득',
                '락 획득 후 현재 등록 인원 조회 → 제한 인원 비교 → 등록 수행',
                '트랜잭션 종료 시 자동 unlock 되므로 별도 관리 불필요',
              ],
            },
            {
              type: 'image',
              src: snsb3DashboardLock,
              alt: '정원 초과 문제: 락 적용 전 vs 후',
            },
          ],
        },
        {
          title: 'SNSB3 표준화 채점 프로그램 — 이메일 발송 아키텍처 설계',
          skillKeywords: ['Spring Boot', 'AWS SES', 'Thymeleaf'],
          role: '2인 팀 합류 · 이메일 발송 아키텍처 파트 단독 담당',
          blocks: [
            { type: 'heading', text: '서비스 정의' },
            {
              type: 'paragraph',
              text:
                'SNSB3는 치매 진단을 위한 표준화 신경심리검사 도구입니다. 전국 임상 전공 대학생들이 수검자를 직접 검사하고 결과를 입력·채점하는 웹 기반 데이터 수집 플랫폼으로, 대규모 임상 데이터 축적을 목적으로 구축됐습니다.',
            },
            { type: 'heading', text: '문제 상황' },
            {
              type: 'paragraph',
              text:
                '수검자 등록이 완료되면 담당자에게 안내 메일을 자동 발송하는 기능이 필요했습니다. 초기 구조는 수검자 등록 저장 로직 안에서 이메일 발송을 직접 호출하는 방식이었으나 다음 네 가지 문제가 있었습니다.',
            },
            {
              type: 'list',
              items: [
                '트랜잭션 정합성 — 데이터 저장이 완료되기 전에 메일이 발송되거나, 저장 실패 시에도 메일이 이미 발송되는 문제',
                '응답 지연 — 외부 메일 서비스 응답 시간만큼 수검자 등록 API 응답이 지연되고, 메일 서비스 장애 시 등록 자체가 실패할 위험',
                '이벤트 발행 시점 문제 — 수검자 번호는 등록 과정 중 마지막 단계에서 확정되므로, 너무 이른 시점에 메일을 보내면 수검번호가 빈 값으로 발송됨',
                'SecurityContext 유실 — 비동기 호출 시 SecurityContext가 유실되어 현재 로그인한 담당자 정보 접근 불가',
              ],
            },
            { type: 'heading', text: '해결 방법' },
            {
              type: 'list',
              ordered: true,
              items: [
                '트랜잭션 정합성 — @TransactionalEventListener(AFTER_COMMIT)를 도입해, 데이터 저장이 완전히 완료된 시점에만 리스너가 실행되도록 했습니다. 저장에 실패하면 메일 발송 이벤트 자체가 실행되지 않습니다.',
                '응답 지연 — 여기에 @Async를 결합해 메일 발송을 별도 스레드에서 처리하도록 분리해, 메일 발송이 수검자 등록 응답 속도에 영향을 주지 않게 했습니다.',
                '이벤트 발행 시점 문제 — 이벤트 발행 시점을 수검자 번호가 최종 확정되는 마지막 저장 단계 완료 후로 변경해, 수검번호가 빈 값으로 발송되는 문제를 해결했습니다.',
                'SecurityContext 유실 — 등록 시점(요청 스레드)에 담당자 ID를 미리 추출해 이벤트에 함께 전달하고, 비동기 스레드에서는 이 ID로 이메일 주소를 조회하는 방식으로 해결했습니다.',
              ],
            },
            {
              type: 'paragraph',
              text:
                '메일 발송은 AWS SES를 사용했습니다. 기존 회원가입·이메일 인증 등에 이미 SES 연동이 구축되어 있었기 때문에, 새 기능을 위해 별도의 메일 발송 인프라를 추가로 도입하지 않고 기존에 검증된 발송 경로를 그대로 재사용했습니다.',
            },
            { type: 'heading', text: '구현 흐름' },
            {
              type: 'list',
              items: [
                '수검자 기본정보 저장 → 예약정보 저장 → 수검자 번호 확정 순으로 단계적으로 저장',
                '수검자 번호 확정 완료 후, 담당자 ID를 포함한 메일 발송 이벤트 발행',
                '데이터 저장이 완전히 완료된 시점에 이벤트 실행 → 비동기 처리로 전달',
                '별도 스레드에서 담당자 ID로 이메일 주소 조회 → 수검자 번호 조회 → HTML 메일 렌더링 → 발송',
              ],
            },
            {
              type: 'image',
              src: snsb3EmailArchitecture,
              alt: '이메일 발송 구조: 커밋 후 비동기 처리',
            },
          ],
        },
        {
          title: 'SNSB3 앱 — 검사 진입 성능 개선',
          skillKeywords: ['Flutter', 'Dart'],
          role: '1차 완성 앱 인수 후 전체 리팩토링 및 성능 개선 단독 진행',
          blocks: [
            { type: 'heading', text: '서비스 정의' },
            {
              type: 'paragraph',
              text:
                '기존에 검사지와 펜으로 진행하던 SNSB3 검사를 태블릿 앱으로 대체한 서비스입니다. 수검자가 앱에서 직접 검사를 진행하고 채점까지 가능하며, 웹 채점 프로그램과 동일한 백엔드 API를 공유합니다.',
            },
            { type: 'heading', text: '문제 상황' },
            {
              type: 'paragraph',
              text:
                '검사 화면 진입 시 첫 진입 약 5.9초, 재진입 약 3.6초의 지연이 발생했습니다. Flutter DevTools로 측정한 결과, 진입 초기화 API 자체는 131ms로 빠르지만 이후 화면 로딩에서 병목이 집중되는 것을 확인했습니다. 원인은 두 가지였습니다.',
            },
            {
              type: 'list',
              items: [
                'API 중복 호출(Thundering Herd) — 검사 화면은 28개의 세부 검사 항목으로 구성됩니다. 검사 데이터 조회 API가 항목별로 분리되어 있지 않고 전체 검사 결과를 한 번에 내려주는 구조였기 때문에, 각 항목 컨트롤러가 초기화될 때마다 동일한 전체 조회 API를 각자 독립적으로 호출했습니다. HTTP/1.1은 요청을 직렬로 처리하기 때문에 214ms × 28 ≈ 6,000ms의 지연이 발생했습니다.',
                '전체 페이지 일괄 렌더링 — 페이지 전환마다 위젯 생성과 API 호출에 따른 지연이 발생하는 것을 피하기 위해, IndexedStack으로 약 39개 검사 페이지 위젯을 진입 시점에 모두 빌드하고 각자 API를 호출해두는 방식으로 구현되어 있었습니다. 그 결과 페이지 전환은 빨랐지만, 진입 시점에 위젯 빌드와 API 호출이 한꺼번에 몰려 초기 부하가 컸습니다.',
              ],
            },
            { type: 'heading', text: '해결 방법' },
            {
              type: 'list',
              items: [
                'API 중복 호출 제거 — 첫 번째 호출자만 실제 API를 호출하고, 나머지 27개는 동일한 Future를 공유해 대기하도록 처리했습니다. API 응답이 도착하면 결과를 캐시에 저장하고, 이후 요청은 캐시 히트로 즉시 반환되어 최대 28번이던 API 호출을 1번으로 줄였습니다. 이 캐시는 세션 동안 재사용되므로 정합성 관리가 필요했습니다. 캐시에 데이터가 없는 경우(캐시 미스)에는 API를 다시 호출하는 fallback을 두었고, 각 세부 페이지의 결과를 종합해 보여주는 검사 결과 페이지에서는 초기에 변경 전 캐시값이 그대로 표시되는 문제가 있어, 세부 페이지에서 값을 변경하면 해당 캐시를 즉시 갱신해 결과 페이지 진입 시 항상 최신 값이 반영되도록 처리했습니다.',
                'Lazy 빌드 전환 — IndexedStack을 제거하고 현재 보고 있는 페이지만 조건문으로 렌더링하도록 변경했습니다. 검사 데이터는 앞서 캐시에 이미 적재되어 있으므로, 페이지를 처음 열 때도 추가 API 호출 없이 캐시된 데이터로 위젯만 새로 빌드하면 됩니다. 한 번 빌드된 페이지 위젯은 이후에도 그대로 유지(캐시)해, 같은 페이지를 다시 방문할 때는 위젯을 다시 빌드하지 않도록 했습니다. 그 결과 페이지 전환 시 지연 없이 진입 시점의 초기 부하만 크게 줄일 수 있었습니다.',
              ],
            },
            {
              type: 'image',
              src: snsb3AppPerformance,
              alt: '검사 화면 진입 성능: 개선 전 vs 후',
            },
          ],
        },
        {
          title: '사내 인프라 — 개발 인프라 MCP 서버 도입',
          skillKeywords: ['Spring Boot', 'MCP Protocol', 'Sentry API', 'CloudWatch'],
          role: '1인 단독 설계·구현',
          blocks: [
            { type: 'heading', text: '서비스 정의' },
            {
              type: 'paragraph',
              text:
                'API 문서·DB·Sentry·CloudWatch·QA 대시보드 등 개발 중 반복적으로 확인해야 하는 사내 인프라를 AI가 직접 조회할 수 있도록 연결하는 사내 MCP 서버입니다. Spring Boot 기반으로 구현했으며, Claude 등 AI 클라이언트가 자연어 요청만으로 API 명세 확인, DB 조회, 에러·인프라 모니터링, QA 테스트 결과 확인까지 수행할 수 있도록 지원합니다.',
            },
            { type: 'heading', text: '구현 내용' },
            {
              type: 'list',
              items: [
                'Swagger 연동 툴 — API 명세를 직접 조회해 엔드포인트·파라미터·응답 구조 파악',
                'DB 조회 툴 — 자연어 요청을 SELECT 쿼리로 변환해 조회. 처음에는 코드 레벨에서 SELECT 강제·키워드 블랙리스트로만 검증했으나, Claude가 툴을 거치지 않고 별도로 확보한 DB 접속 정보로 직접 쿼리를 실행한 사례가 발생해 코드 레벨 방어만으로는 한계가 있다고 판단. DB 계정 자체를 SELECT 단일 권한으로 제한해, 어떤 경로로 접속하든 데이터 변경이 원천적으로 불가능하도록 전환',
                'Sentry·CloudWatch 연동 툴 — 최근 에러 발생 현황과 인프라 로그·메트릭을 직접 조회',
                '사내 QA 대시보드 연동 툴 — 자동화 E2E QA 서버의 테스트 결과를 직접 조회',
              ],
            },
            {
              type: 'image',
              src: mcpServerArchitecture,
              alt: '사내 MCP 서버 구성',
            },
            {
              type: 'paragraph',
              text:
                'API 명세·DB 데이터·에러 현황을 AI가 직접 참조할 수 있게 되면서, 적은 인원으로도 반복적인 확인 작업에 쓰는 시간을 크게 줄일 수 있었습니다.',
            },
          ],
        },
        {
          title: '사내 인프라 — Notion-Discord-AI 버그 자동 처리 파이프라인',
          skillKeywords: ['Node.js', 'AWS SQS', 'Discord Bot', 'Notion API'],
          role: '1인 단독 설계·구현',
          blocks: [
            { type: 'heading', text: '문제 상황' },
            {
              type: 'paragraph',
              text:
                '버그 리포트를 Notion 티켓 DB로 관리하고 있었으나 버그 생성 시 실시간 확인이 어렵고, 담당자 전달이 즉시 이루어지지 않으며, 반복적인 버그 분류·전달 작업이 발생했습니다. 버그 리포트가 "설명 / 재현 단계 / 실제 결과 / 예상 결과"의 고정 포맷을 따르는 정형화된 구조여서 자동화 가능성이 높다고 판단했습니다.',
            },
            { type: 'heading', text: '설계 및 구현' },
            {
              type: 'paragraph',
              text:
                '초기에는 JSON 파일 기반으로 상태를 관리했으나 두 가지 문제가 있었습니다. 첫째, 여러 프로세스가 동시에 파일을 읽고 쓸 경우 데이터가 덮어씌워지거나 유실될 수 있어 안정성이 부족했습니다. 둘째, AI Worker를 여러 대로 늘리면 같은 작업을 중복으로 처리하거나 작업이 누락되는 문제가 발생해 수평 확장이 어려웠습니다. 이후 DB + AWS SQS 구조로 전환해 상태 추적과 장애 복구, Worker 수평 확장이 가능하도록 개선했습니다. 처리할 AI Worker가 소수이고 각 작업이 정확히 한 번씩 처리되는 것이 중요했기 때문에, 재시도(Visibility Timeout)·DLQ 같은 큐 자체 기능을 그대로 활용할 수 있는 단일 SQS Standard 큐로 충분하다고 판단했습니다. 다만 Worker 수가 늘어 작업을 Worker별로 분리해야 하는 시점이 오면 SNS+SQS 조합이나, Worker별 독립 소비가 가능한 Kafka로 전환하는 방향을 염두에 두고 있습니다.',
            },
            {
              type: 'list',
              items: [
                'Notion DB를 60초 주기로 Polling해 신규·변경 버그 감지 → Discord 채널에 즉시 알림',
                'Discord 메시지에 Repository 선택·AI Provider 선택·AI 해결 버튼 인터랙션 제공',
                '버튼 클릭 시 Backend가 SQS에 작업을 enqueue, AI Worker가 polling 후 처리',
                'AI Worker는 선택한 Provider(Claude / Gemini / Codex)에 맞는 CLI 명령어를 조합해 선택한 Repository 경로에서 비대화형으로 실행. QA팀이 정해진 양식(문제 상황·재현 단계·예상 결과·실제 결과)으로 작성한 노션 버그 리포트를 파싱해 프롬프트로 구성한 뒤 넘겨줌',
                '단순한 버그는 AI가 자동으로 수정 가능했으나, API 서버와 클라이언트를 동시에 파악해야 하는 복합적인 버그는 단일 레포 컨텍스트만으로는 해결이 어려웠음 — 멀티 레포 컨텍스트 지원이 필요한 한계로 파악',
              ],
            },
            { type: 'heading', text: '한계점 및 개선 방향 — SQS Queue Thrashing' },
            {
              type: 'paragraph',
              text:
                '각 AI Worker는 서로 다른 PC에서 실행되므로, 특정 PC로 전달해야 하는 작업을 SQS 메시지로 전달했습니다. 그런데 SQS는 메시지를 미리 열어볼 수 없고 꺼낸 후에야 내용을 확인할 수 있기 때문에, Worker가 자신의 작업이 아닌 메시지를 꺼낸 경우 다시 큐에 넣는 방식을 사용했습니다. 이로 인해 세 가지 문제가 발생했습니다.',
            },
            {
              type: 'list',
              items: [
                'Queue Thrashing — 모든 Worker가 메시지를 꺼냈다 다시 넣기를 반복하면서 실제 처리보다 큐 작업 자체가 폭증',
                'Message Starvation — 대상 Worker가 아닌 다른 Worker들이 메시지를 반복해서 꺼내다 보니, 정작 처리해야 할 Worker에게 메시지가 늦게 도달',
                '중복 소비 가능성 — SQS에서 메시지를 꺼내는 것(Receive)은 삭제(Delete)가 아닙니다. 꺼낸 메시지는 일정 시간(Visibility Timeout) 동안만 다른 Worker에게 숨겨지고, 자신의 작업이 아니라고 판단해 다시 전송(재인큐)하더라도 원본 메시지를 Delete하지 않으면 타임아웃 후 큐에 그대로 다시 노출됩니다. 그 결과 같은 작업을 가리키는 메시지가 큐에 중복으로 남아 서로 다른 Worker에게 동시에 전달될 수 있음',
              ],
            },
            {
              type: 'paragraph',
              text:
                '개선 방향으로 세 가지를 검토했습니다. 첫째, 메시지가 여러 번 반환되면 처리 불가 메시지함(DLQ)으로 이동시켜 무한 반복을 차단합니다. 둘째, 꺼낸 메시지를 즉시 다시 넣지 않고 일정 시간 대기 후 넣어 Worker 간 충돌을 줄입니다. 셋째, 장기적으로는 Worker별로 메시지를 독립적으로 소비하는 구조로 전환해 경합 자체를 없애는 방향을 고려하고 있습니다. SNS는 Push 방식이라 Worker가 처리할 준비가 안 된 순간의 메시지가 유실될 수 있어 단독으로는 쓰기 어렵고, SNS Topic + Worker별 SQS 큐를 조합하거나, Topic과 Consumer Group으로 Worker별 독립 소비가 단독으로 가능한 Kafka로 전환하는 방식을 고려하고 있습니다. 현재 사내 인프라 규모에서는 현 구조가 요구사항을 충족하므로 단계적으로 개선하고 있습니다.',
            },
            {
              type: 'image',
              src: bugPipelineArchitecture,
              alt: '버그 리포트 자동 처리 파이프라인',
            },
          ],
        },
      ],
    },
    {
      title: '디엠시스템엔지니어링',
      period: '2025.04 ~ 2025.12',
      positionTitle: '개발자',
      projects: [
        {
          title: '레이저 피난 유도기 실시간 관제 시스템',
          skillKeywords: [
            'Spring Boot',
            'MQTT',
            'MongoDB',
            'Redis',
            'MariaDB',
            'React',
            'Docker',
            'Grafana',
          ],
          role: '1인 단독 설계·구현·운영 (셀트리온·디아지오 납품 및 운영)',
          blocks: [
            { type: 'heading', text: '서비스 정의' },
            {
              type: 'paragraph',
              text:
                '건물 내 설치된 레이저 피난 유도기의 센서 데이터를 실시간으로 수집하고, 원격으로 유도기를 제어하는 관제 시스템입니다. 셀트리온·디아지오 등 대형 사업장에 납품 및 운영 중이며, 수십 대의 디바이스를 단일 플랫폼에서 관리합니다.',
            },
            {
              type: 'image',
              src: laserSystemArchitecture,
              alt: '레이저 피난 유도기 관제 시스템 아키텍처',
            },
            { type: 'heading', text: 'MQTT 전환 — 실시간 제어 성능 개선' },
            {
              type: 'paragraph',
              text:
                '디바이스 수가 늘어날수록 서버 부하가 비례해서 증가하지 않는 연결 구조가 필요하다고 판단해 MQTT pub/sub 방식을 채택했습니다. 브로커를 통해 토픽 단위로 메시지를 분산 처리해, 디바이스가 늘어나도 서버 부하가 선형적으로 증가하지 않습니다.',
            },
            {
              type: 'paragraph',
              text:
                '제어 명령 유실 방지를 위해 발행 메시지에 QoS 1을 적용했으며, 브로커 연결이 끊기면 3초 간격으로 재연결을 시도하고 성공 시 토픽을 재구독하는 방식으로 복구합니다. 디바이스 수가 적고 빠른 복구가 중요해서 단순 고정 재시도를 선택했습니다.',
            },
            { type: 'heading', text: 'OTA 펌웨어 배포 — 실시간 진행률 모니터링' },
            {
              type: 'image',
              src: otaUpdateFlow,
              alt: 'ESP32 OTA 업데이트 흐름',
            },
            {
              type: 'image',
              src: otaFlashMemory,
              alt: '플래시 메모리 구조',
            },
            {
              type: 'paragraph',
              text:
                '펌웨어 업데이트 시 수십 대 디바이스의 진행 상태를 실시간으로 파악할 수 없었습니다.',
            },
            {
              type: 'paragraph',
              text:
                'ESP32는 RAM이 작아 파일 전체를 메모리에 올릴 수 없기 때문에, 128바이트씩 스트리밍으로 읽어 받는 즉시 플래시에 쓰는 방식을 사용했습니다.',
            },
            {
              type: 'paragraph',
              text:
                '파일을 다 쓴 뒤에는 Update.end()로 체크섬을 검증하고 새 펌웨어가 담긴 파티션을 다음 부팅 대상으로 지정한 뒤 재부팅합니다. 현재 실행 중이 아닌 파티션에 새 펌웨어를 기록하는 방식이라, 업데이트 중 전원이 끊겨도 기존 파티션은 그대로 보존되어 안전합니다.',
            },
            { type: 'heading', text: '디바이스 연결 상태 관리' },
            {
              type: 'paragraph',
              text:
                '수십 대 디바이스 중 일부가 통신이 끊겼는지를 실시간으로 파악해야 했습니다. MQTT 수신 스레드와 @Scheduled 스레드가 동시에 Map에 접근하기 때문에 ConcurrentHashMap으로 동시 접근 원자성을 보장하며 디바이스별 마지막 통신 시각을 기록하고, 10초마다 전체 디바이스를 순회해 임계값(60초)을 초과하면 오프라인으로 상태를 전이시키는 연결 상태 관리 모듈을 구현했습니다.',
            },
            { type: 'heading', text: '디바이스 제어 및 권한 관리' },
            {
              type: 'paragraph',
              text:
                '디바이스 제어는 관제 화면에서 방향·각도·경보 상태를 선택해 전송하면 MQTT로 해당 디바이스에 명령을 발행하고, ESP32가 이를 수신해 UART 시리얼로 STM32에 전달하는 구조로 구현했습니다.',
            },
            {
              type: 'image',
              src: laserSystemScreenshot,
              alt: '레이저 피난유도기 관제시스템 실제 화면',
            },
            { type: 'heading', text: 'Docker 기반 멀티 환경 배포' },
            {
              type: 'paragraph',
              text:
                '셀트리온·디아지오 등 일부 고객사는 보안 정책상 외부 인터넷이 차단된 폐쇄망 온프레미스 서버에만 시스템을 설치할 수 있었고, 다른 고객사는 클라우드(AWS EC2) 환경에 배포해야 했습니다. 동일한 시스템을 두 가지 다른 네트워크 환경에 배포해야 하는 요구사항이었습니다.',
            },
            {
              type: 'paragraph',
              text:
                'React, Spring Boot, Nginx, MariaDB, MongoDB, Redis, MQTT Broker로 구성된 전체 스택을 Docker Compose로 묶어, 온프레미스(Rocky Linux 8)와 클라우드(Ubuntu 24.04 LTS, AWS EC2) 양쪽에 동일한 구성으로 배포할 수 있도록 했습니다. 환경별로 달라지는 부분은 도메인·SSL 설정과 외부 네트워크 접근 여부 정도였고, 나머지 애플리케이션 구성은 그대로 재사용해 신규 사업장 배포 시 환경 차이에 따른 추가 작업을 최소화했습니다.',
            },
            { type: 'heading', text: '센서 데이터 보존 정책 — 정기 삭제 배치' },
            {
              type: 'paragraph',
              text:
                'MongoDB에 1초 주기로 누적되는 센서 데이터가 장기 운영 시 스토리지 부담을 일으키는 문제가 있었습니다. @Scheduled(cron)으로 매일 새벽 3시에 실행되는 배치를 구현해, 6개월이 지난 센서 데이터를 일괄 삭제하도록 했습니다. 삭제 건수와 소요 시간은 운영 로그로 기록해 이상 여부를 확인할 수 있도록 했습니다.',
            },
            { type: 'heading', text: '로그 모니터링 — 로그 정규화 및 Promtail 기반 수집' },
            {
              type: 'paragraph',
              text:
                'Logstash Encoder를 적용해 모든 애플리케이션 로그를 JSON 형식으로 정규화하고, 요청·MQTT·DB 등 이벤트별 공통 포맷을 정의했습니다. DB·MQTT·요청 지연은 임계값 기반으로 자동 감지해 WARN 레벨로 출력하고, 정규화된 로그는 Promtail로 수집해 Loki에 적재한 뒤 Grafana 대시보드로 시각화해 슬로우 쿼리·인증 오류·디바이스 연결 이상을 모니터링했습니다.',
            },
          ],
        },
      ],
    },
  ],
  personalProjects: [
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
        {
          content: '자세히 보기',
          href:
            'https://velog.io/@kimseungzzang/%EB%82%98%EB%A7%8C%EC%9D%98-AI-%EC%9B%8C%ED%81%AC-%ED%94%8C%EB%A1%9C%EC%9A%B0-%EB%A7%8C%EB%93%9C%EB%8A%94-%EB%B0%A9%EB%B2%95',
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
          content: '고정 3초 폴링 → 순번 기반 동적 폴링으로 전환해 폴링 트래픽 44% 감소',
        },
        {
          content: 'Redis를 직접 구현하고, real Redis와 처리량·지연 비교 분석',
          descriptions: [
            {
              content:
                '자체 구현은 목표 1,000 req/s부터 처리량·지연 급격 저하, real Redis는 9,583 req/s(p95 284ms)까지 처리',
            },
            {
              content: 'Redis client의 TCP 소켓 연결 방식과 Sorted Set 정렬 방식 차이 발견',
            },
          ],
        },
        {
          content: 'github.com/Kimseungzzang/ticketing',
          href: 'https://github.com/Kimseungzzang/ticketing',
        },
        {
          content: '자세히 보기',
          href: 'https://velog.io/@kimseungzzang/Temp-Title-tkcylmzb',
        },
      ],
    },
  ],
};

export default career;
