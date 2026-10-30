import { ICareer } from '../component/career/ICareer';
import snsb3DashboardLock from '../asset/career/snsb3-dashboard-lock.png';
import snsb3EmailArchitecture from '../asset/career/snsb3-email-architecture.png';
import snsb3AppPerformance from '../asset/career/snsb3-app-performance.png';
import mcpServerArchitecture from '../asset/career/mcp-server-architecture.png';
import bugPipelineArchitecture from '../asset/career/bug-pipeline-architecture.png';
import laserSystemArchitecture from '../asset/career/laser-system-architecture.png';
import snsb3IntegrationBefore from '../asset/career/snsb3-integration-before.png';
import snsb3IntegrationAfter from '../asset/career/snsb3-integration-after.png';
import snsb3MigrationRehearsal from '../asset/career/snsb3-migration-rehearsal.png';
import snsb3HistoryBefore from '../asset/career/snsb3-history-before.png';
import snsb3HistoryAfter from '../asset/career/snsb3-history-after.png';
import snsb3ExamineeDeleteBefore from '../asset/career/snsb3-examinee-delete-before.png';
import snsb3ExamineeDeleteAfter from '../asset/career/snsb3-examinee-delete-after.png';
import snsb3ExamineeDeleteConcurrency from '../asset/career/snsb3-examinee-delete-concurrency.png';
import snsb3ExamineeDeleteScaling from '../asset/career/snsb3-examinee-delete-scaling.png';

const career: ICareer.Payload = {
  disable: false,
  companies: [
    {
      title: '휴브알엔씨',
      period: '2026.01 ~ 현재',
      positionTitle: '개발자',
      projects: [
        {
          title:
            'SNSB 검사 플랫폼 — 표준화(STD)·일반(CMS) 서비스 통합 리팩토링 및 DB 마이그레이션 dry-run 자동화',
          skillKeywords: ['Spring Boot', 'Spring Security', 'QueryDSL', 'Flyway', 'ArchUnit'],
          role: '구조 설계 · 리팩토링 · 데이터 이관 검증',
          blocks: [
            { type: 'heading', text: '서비스 정의' },
            {
              type: 'paragraph',
              text:
                'SNSB 검사 플랫폼은 치매 진단을 위한 표준화 신경심리검사(SNSB)를 서비스하는 플랫폼으로, 하나의 백엔드 서버가 표준화 웹·일반(CMS) 웹·태블릿 검사 앱·관리자 웹을 함께 서비스합니다. 검사자가 수검자를 직접 검사할 때는 앱을, 검사 결과만 입력할 때는 웹을 씁니다. 그중 표준화 웹은 전국 임상 전공 대학생 검사자들이 검사 결과를 입력하는 데이터 수집 웹으로, 대규모 임상 데이터 축적을 목적으로 구축됐습니다.',
            },
            { type: 'heading', text: '문제 상황' },
            {
              type: 'paragraph',
              text:
                '연구용 표준화(STD)는 SNSB-III만, 일반(CMS)은 SNSB-II만 지원하면서 STD·CMS·관리자 API가 각자 자라, 검사자 관리 하나도 세 곳에서 따로 처리하고 있었습니다. "STD = SNSB-III, CMS = SNSB-II"처럼 **STD·CMS 구분이 곧 검사 종류 구분인 것처럼 코드에 박혀 있어**, CMS에 SNSB-III·SNSB-C를 붙이려면 같은 코드를 한 벌 더 만들어야 하는 상황이었습니다.',
            },
            {
              type: 'image',
              src: snsb3IntegrationBefore,
              alt: '원래 구조: 같은 기능이 세 갈래로 자랐다',
            },
            { type: 'heading', text: '해결 방법' },
            {
              type: 'list',
              ordered: true,
              items: [
                '두 축 분리 — STD·CMS와 검사 종류를 서로 다른 축으로 떼어 냈습니다. 검사자·수검자·기관은 **공통 인터페이스와 요청·응답 DTO를 함께 쓰고**, 수검자 번호 규칙·권한처럼 STD·CMS별로 다른 규칙만 구현체가 갖게 했습니다.',
                '서비스 구분 — 사람(검사자·수검자·기관)은 STD·CMS마다 테이블과 규칙이 달라 엔드포인트를 나눴고(/std/examinee, /cms/examinee), 로그인 시 **JWT source 클레임**에 어느 서비스로 로그인했는지 넣어 컨트롤러 클래스 단위 @PreAuthorize로 다른 서비스 호출을 막았습니다. 검사는 두 서비스가 같은 테이블을 쓰므로 엔드포인트를 /tests 하나로 두고, source 값에 따라 QueryDSL로 조인할 사람 테이블만 바꿔 끼웠습니다.',
                '경계 고정 — STD와 CMS 코드가 서로를 참조하면 빌드가 깨지도록 **ArchUnit** 테스트를 PR마다 CI에서 돌게 했습니다.',
              ],
            },
            {
              type: 'image',
              src: snsb3IntegrationAfter,
              alt: '개선 후: STD·CMS 축과 검사 종류 축을 나눴다',
            },
            { type: 'heading', text: '데이터 이관 검증 — DB 마이그레이션 dry-run 자동화' },
            {
              type: 'paragraph',
              text:
                '구조 변경에 맞춰 기존 행을 다시 쓰는 Flyway 마이그레이션이 필요했고, 틀리면 검사 데이터가 그대로 망가집니다. 이관 전후를 손으로 비교하던 확인을 스크립트로 옮겨, 스냅샷을 뜨고 적용·롤백한 뒤 **테이블별 행 수와 행·컬럼 해시**가 처음과 같은지 비교하고, 다르면 어느 테이블·컬럼·행이 다른지 알려 주며 실패하게 했습니다.',
            },
            {
              type: 'image',
              src: snsb3MigrationRehearsal,
              alt: 'DB 마이그레이션 dry-run 흐름',
            },
            {
              type: 'list',
              items: [
                '**실제 결함 1건 발견** — V10 롤백이 보관 테이블을 CREATE TABLE AS로 만들고 있어, "롤백 → 재적용 → 다시 롤백" 순서에서 두 번째 롤백이 already exists로 실패했습니다. 보관 테이블은 처음 한 번만 만들고 이후에는 이어 쌓도록 고쳤습니다.',
                'dry-run이 결함을 제대로 잡는지는 롤백 한 줄을 일부러 빼면 1,417행이 다르다고 알리며 실패하는 것으로 확인했습니다.',
              ],
            },
            { type: 'heading', text: '결과' },
            {
              type: 'list',
              items: [
                '엔드포인트 **140개 → 87개**(38%↓), 같은 기능을 하는 중복 클래스 **29개 → 0개**',
                'DB 마이그레이션 dry-run **13개 버전 일치**, 롤백 결함 1건을 운영 전에 발견 (개발 서버 데이터 복제본 기준)',
                '바뀐 API 계약에 맞춰 앱·웹 클라이언트도 함께 수정',
              ],
            },
          ],
        },
        {
          title: 'SNSB 검사 플랫폼 — Transactional Outbox로 변경 이력 유실 해결',
          skillKeywords: ['Spring Boot', 'PostgreSQL', 'AWS S3', 'k6'],
          role: '설계 · 구현 · 부하 검증',
          blocks: [
            { type: 'heading', text: '문제 상황' },
            {
              type: 'paragraph',
              text:
                '변경 이력(감사 로그)을 커밋이 끝난 뒤 별도 비동기 스레드에서 메모리 큐를 거쳐 저장하고 있었습니다. 운영과 같은 JVM 설정(Serial GC·힙 1GB)으로 부하를 걸어 보니 세 가지 문제가 나왔습니다.',
            },
            {
              type: 'list',
              items: [
                '커넥션 경합 — 이력 스레드가 요청과 같은 커넥션 풀을 써서, 동시 저장 50명부터 **커넥션 10개 중 8개를 이력이 차지**했고 저장 처리량이 이력을 끈 경우보다 26~40% 낮았습니다.',
                '조용한 유실 — 30초 안에 커넥션을 받지 못한 이력은 로그 한 줄만 남기고 사라졌습니다(200명 동시 저장에서 2건). 저장 요청은 성공으로 끝나 **유실을 알 방법이 없었습니다**.',
                '종료 시 유실 — 수검자 1만 명을 지운 직후 서버를 강제 종료하자 메모리 큐에 있던 **8,725건 중 8,724건이 사라졌습니다**.',
              ],
            },
            {
              type: 'image',
              src: snsb3HistoryBefore,
              alt: '원래 구조: 커밋 후 별도 비동기 스레드에서 이력 저장',
            },
            { type: 'heading', text: '해결 방법' },
            {
              type: 'list',
              ordered: true,
              items: [
                '같은 트랜잭션에 기록 — 이력을 원래 트랜잭션 안에서 아웃박스 테이블에 INSERT해, **변경이 롤백되면 이력도 롤백되고 커밋되면 함께 남게** 했습니다.',
                '저장소는 S3 — 앱이 읽지 않는 감사 로그가 이미 DB의 72%를 차지했고, DB에 있는 한 DB 권한만으로 고치거나 지울 수 있었습니다. Object Lock·권한 분리·Glacier·Athena 조회를 위해 S3를 골랐고, DB와 한 트랜잭션으로 묶을 수 없는 **이기종 저장소**라 아웃박스에 남긴 뒤 옮기는 구조로 정했습니다. 저장이 초당 3건 남짓(기존 PC용 SNSB-II 검사 프로그램 약 1,600대가 옮겨 온다고 가정)이라 Kafka 대신 이미 쓰는 PostgreSQL을 큐로 썼습니다.',
                '전달은 별도 이력 서비스 — 앱 안에서 읽으면 다시 요청과 커넥션을 나눠 쓰게 되어, 새 서버 없이 기존 EC2에 별도 서비스를 올렸습니다. 아웃박스를 **SKIP LOCKED**로 나눠 가져가 S3(JSON Lines·gzip)에 올리고, 성공한 행만 지웁니다.',
                '실패 처리 — 묶음이 실패하면 한 건씩 다시 올리고, **같은 묶음의 뒤 행이 성공했을 때만** 실패 행을 DLT로 보내 S3 장애와 불량 행을 구분했습니다. 연속 실패는 장애로 보고 1~60초 **지수 백오프**로 재시도하며, graceful shutdown으로 진행 중인 묶음을 마치고 종료합니다. 업로드 후 행 삭제 전에 죽어 생길 수 있는 중복은 **event_id**로 읽을 때 걸러 멱등성을 지켰습니다.',
              ],
            },
            {
              type: 'image',
              src: snsb3HistoryAfter,
              alt: '개선 후: 같은 트랜잭션의 아웃박스 + 별도 전달',
            },
            { type: 'heading', text: '결과' },
            {
              type: 'paragraph',
              text:
                'S3 파일을 전부 읽어 커밋된 변경 수와 맞춰 봤습니다. PC용 검사 프로그램 1,600대가 모두 옮겨 온 날을 가정해 목표 부하를 동시 900명으로 세우고, k6로 실제 검사 흐름을 50분 동안 재현했습니다.',
            },
            {
              type: 'list',
              items: [
                '장애 조건 유실 — 커넥션 대기 초과 2건 → **0건**, 서버 강제 종료 8,724건 → **0건**, S3 30초 중단·이력 서비스 kill -9 중 **0건**(1,037 / 1,037)',
                '목표 부하(k6 900명·50분) — 이력 유실 **0건**, 저장 p95 **10ms**, DB 커넥션 10개 중 1개 사용',
                '39,523건 중 1건 실패를 추적해 Tomcat keep-alive와 ALB idle timeout(60초)의 경합을 찾고, keep-alive를 **75초**로 바꿔 반영',
                '200명 연속 저장 최악 조건에서 heap dump로 rawData JSON 트리(2.2MB → 약 13MB)를 든 채 커넥션을 기다리는 요청 스레드가 힙을 채운 것을 확인하고, 힙 1·2·3GB 비교로 **힙 2GB**(처리량 47 → 115건/초, 실패 0건)로 결정',
                '측정 중 드러난 이력 서비스 OOM(대용량 이력 묶음 일괄 로드)을 행 크기를 먼저 보고 끊어 읽도록 고쳐 릴리스',
              ],
            },
          ],
        },
        {
          title: 'SNSB 검사 플랫폼 — 수검자 삭제 API OOM 위험 예측 및 성능 개선',
          skillKeywords: ['Spring Boot', 'JPA', 'QueryDSL', 'PostgreSQL', 'k6'],
          role: '부하 테스트 설계부터 원인 분석·개선·검증까지 단독 진행',
          blocks: [
            { type: 'heading', text: '문제 상황' },
            {
              type: 'paragraph',
              text:
                '수검자를 삭제하면 그 수검자의 검사 기록도 함께 소프트 삭제해야 하는데, 기존 코드는 **검사 테이블 전체를 엔티티로 읽어 온 뒤 메모리에서 지울 대상을 거르는 방식**(findAll 후 filter)이었습니다. 운영 검사 테이블이 아직 4천 행이라 문제가 드러나지 않았지만, 삭제 비용이 지우는 인원이 아니라 검사 테이블 크기에 비례하는 구조였습니다.',
            },
            {
              type: 'image',
              src: snsb3ExamineeDeleteBefore,
              alt: '원래 삭제: 1명을 지워도 테이블 전체를 읽는다',
            },
            { type: 'heading', text: '부하 테스트 설계' },
            {
              type: 'paragraph',
              text:
                '"언젠가 터진다"가 아니라 언제 터지는지 숫자로 답하기 위해, 운영과 같은 JVM 설정(**힙 1GB·Serial GC**)으로 서버를 띄우고 검사 테이블을 4천~37.5만 행으로 늘려 가며 두 단계로 측정했습니다.',
            },
            {
              type: 'list',
              items: [
                '서비스 단계 — 통합 테스트에서 서비스 메서드를 직접 호출해 Hibernate Statistics로 쿼리 수·엔티티 로드 수, 스레드 할당 메모리, pg_stat_user_tables로 테이블 전체 스캔 횟수를 측정 (원인 분석용)',
                'HTTP 단계 — k6로 삭제 API에 단건·동시 요청을 보내면서 같은 시간 다른 API(수검자 목록 조회)의 응답 시간과 GC 로그를 함께 수집 (운영 영향 확인용)',
              ],
            },
            { type: 'heading', text: '원인 분석' },
            {
              type: 'list',
              items: [
                '**EXPLAIN만으로는 보이지 않는 병목** — 검사 10만 행 전체 스캔은 DB에서 17ms였지만, 같은 삭제가 앱에서는 600ms와 메모리 566MB를 썼습니다. 병목은 DB가 아니라 JVM이 10만 행을 엔티티로 만들고 변경 감지용 사본까지 들고 있는 비용이었습니다.',
                '**동시 요청에서 서버 전체 장애** — 요청마다 테이블 전체 로드가 따로 일어나, 검사 5만 행에서 삭제 요청 10건이 몰리자 GC만 반복하다 OOM이 났고 그동안 삭제와 무관한 API도 거의 응답하지 못했습니다.',
                '**장애 한계를 식으로 계산** — GC 로그에서 Full GC 뒤에도 요청 하나가 행마다 붙잡는 메모리를 구해 "앱 기본 사용량(약 58MB) + 동시 삭제 수 × 검사 행 수 × 약 2.6KB ≥ 힙(약 989MB) → 장애"라는 식을 세웠습니다. 식이 예측한 1명 삭제 한계는 약 36만 행이었고, 실측에서 **35만 행은 버티고 37.5만 행에서 OOM**이 나 식과 맞았습니다. 기존 PC용 SNSB-II 검사 프로그램 약 1,600대가 이 플랫폼으로 옮겨 오면 검사 테이블이 1년에 약 35만 행씩 늘어 **약 1년이면 1명 삭제로도 장애**가 난다는 것을 근거로 개선을 진행했습니다.',
              ],
            },
            { type: 'heading', text: '해결 방법 — 효과를 나눠 보기 위해 2단계로 개선' },
            {
              type: 'list',
              ordered: true,
              items: [
                '1단계: 테이블 전체 로드 제거 — 지울 수검자의 검사만 DB 조건(examinee_id IN)으로 조회하도록 바꿔 기존 인덱스를 타게 했습니다. 메모리와 시간이 검사 테이블 크기와 무관해졌지만, 엔티티를 올려 변경 감지로 한 행씩 UPDATE하는 방식은 그대로라 쿼리 수(5N+1)는 줄지 않았습니다.',
                '2단계: 벌크 UPDATE — 수검자 존재 확인 조회 1번 + QueryDSL 벌크 UPDATE 2번으로 바꿔 **요청 안 쿼리를 삭제 인원과 상관없이 3번**으로 고정했습니다(이력 INSERT 제외). 벌크 UPDATE는 JPA 감사 리스너(@LastModifiedDate·@LastModifiedBy)를 거치지 않으므로 삭제 시각과 삭제자를 쿼리에 직접 기록해, 수검자와 검사가 같은 시각·같은 삭제자로 남도록 했습니다.',
                '삭제 이력은 벌크 UPDATE 전에 같은 트랜잭션의 아웃박스에 남겨 빠지지 않게 했고, CMS 수검자에게도 SNSB-III 검사가 생길 수 있게 되어 검사 종류와 상관없이 그 수검자의 검사를 모두 지우도록 바꿨습니다.',
              ],
            },
            {
              type: 'image',
              src: snsb3ExamineeDeleteAfter,
              alt: '개선 후: 지울 대상만 골라 벌크 UPDATE',
            },
            { type: 'heading', text: '결과' },
            {
              type: 'list',
              items: [
                '장애 재현 조건(검사 5만~10만 행, 동시 삭제 10건)에서 **OOM·서버 응답 불가 0건**, 동시 요청 중 목록 조회 p95 9~18ms로 영향 없음',
                '검사 10만 행 기준 1명 삭제 응답(HTTP) **700ms → 8ms**, 동시 삭제 10건 동안 Full GC **344회 → 0회**',
                '4만 명 일괄 삭제 응답 **10.4초 → 3.0초**, 할당 메모리 **3.4GB → 0.2GB**, 쿼리 20만 번 → 3번(이력 INSERT 제외)',
              ],
            },
            {
              type: 'image',
              src: snsb3ExamineeDeleteConcurrency,
              alt: '동시 삭제 요청 10건: 원래 코드는 5만 행부터 응답 없음, 개선 후 수십 ms',
            },
            {
              type: 'image',
              src: snsb3ExamineeDeleteScaling,
              alt: '한 번에 지우는 수검자 수에 따른 응답 시간·메모리 비교',
            },
          ],
        },
        {
          title: 'SNSB 검사 플랫폼 — 표준화 웹 수검자 현황 대시보드 개발',
          skillKeywords: ['Spring Boot', 'PostgreSQL'],
          role: '2인 팀 합류 · 수검자 대시보드 파트 단독 담당',
          blocks: [
            { type: 'heading', text: '문제 상황' },
            {
              type: 'paragraph',
              text:
                'SNSB-III 표준화 검사는 나이대·성별·교육 연수별로 수집해야 하는 수검자 수가 사전에 정해져 있습니다. 좌석 예매처럼 각 그룹마다 정원이 고정되어 있어, 해당 정원을 초과하면 데이터 편향이 생기므로 초과 등록을 반드시 차단해야 했습니다.',
            },
            {
              type: 'paragraph',
              text:
                '수검자 현황 대시보드는 "현재 등록 인원 / 제한 인원" 형태로 표시되며, 제한 인원 초과를 막기 위해 등록 요청 시 현재 인원을 조회 후 비교하는 방식으로 검증하고 있었습니다.',
            },
            {
              type: 'paragraph',
              text:
                '그러나 동시에 여러 요청이 들어올 경우, 두 요청이 모두 "9/10" 상태를 읽고 검증을 통과한 뒤 각각 등록을 수행해 **최종 결과가 "11/10"이 되는 Race Condition**이 발생할 수 있었습니다.',
            },
            { type: 'heading', text: '기술 선택 과정' },
            {
              type: 'list',
              ordered: true,
              items: [
                'Redis의 DECR 명령으로 카운터를 원자적으로 차감하는 방식도 고려했습니다. 그러나 이 방식은 PostgreSQL과 별도로 Redis에 카운터 상태를 추가로 두고 두 저장소 간 정합성을 맞춰야 하는데, 현재 동시 등록 트래픽 규모에서는 이 정도의 인프라를 추가할 필요가 없다고 판단해 적용하지 않았습니다.',
                'UPDATE ... WHERE count < limit 형태의 조건부 업데이트도 검토했습니다. 이 방식은 DB의 row-level 락만으로 원자적으로 처리되어 별도 락 없이도 정원 초과를 막을 수 있다는 장점이 있습니다. 다만 이를 적용하려면 현재 인원을 별도의 카운터 컬럼으로 새로 관리해야 하고, 수검자 취소·변경 등 다른 경로로 데이터가 바뀔 때마다 이 카운터를 JOIN 집계 결과와 항상 일치시켜야 하는 동기화 문제가 새로 생겨, 기존 데이터 모델을 바꾸지 않고는 적용하기 어려웠습니다.',
                '이를 해결하기 위해 PostgreSQL의 **pg_advisory_xact_lock**을 선택했습니다. pg_try_advisory_xact_lock 같은 논블로킹 방식도 검토했으나, 순서 보장이 필요하고 락 경합이 빈번하지 않을 것으로 예상되어 블로킹 방식인 pg_advisory_xact_lock을 사용했습니다. 이 방식은 DB row가 아닌 애플리케이션이 정의한 임의의 키 단위로 락을 획득할 수 있어, 기존 JOIN 집계 쿼리 로직은 그대로 둔 채 동일 검사 그룹에 대한 요청만 직렬화하고 관련 없는 그룹 간의 락 경합을 최소화할 수 있었습니다.',
              ],
            },
            { type: 'heading', text: '구현 방식' },
            {
              type: 'list',
              ordered: true,
              items: [
                '검사 그룹을 구성하는 성별·연령대·학력 속성을 문자열로 이어붙인 뒤 SHA-256으로 해싱해 정수 락 키로 변환 (그룹을 대표하는 별도 PK 컬럼이 없어, 속성 조합 자체를 키로 사용)',
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
          title: 'SNSB 검사 플랫폼 — 이메일 발송 아키텍처 설계',
          skillKeywords: ['Spring Boot', 'AWS SES', 'Thymeleaf'],
          role: '2인 팀 합류 · 이메일 발송 아키텍처 파트 단독 담당',
          blocks: [
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
                '이벤트 발행 트랜잭션 문제 — 수검자 번호는 별도 테이블에 후속 API로 저장되는 구조라, 최초 등록 트랜잭션에서 이벤트를 발행하면 커밋 후에도 수검자 번호가 아직 존재하지 않아 빈 값으로 발송됨',
                'SecurityContext 유실 — 비동기 호출 시 SecurityContext가 유실되어 현재 로그인한 담당자 정보 접근 불가',
              ],
            },
            { type: 'heading', text: '해결 방법' },
            {
              type: 'list',
              ordered: true,
              items: [
                '트랜잭션 정합성 — **@TransactionalEventListener(AFTER_COMMIT)**를 도입해, 데이터 저장이 완전히 완료된 시점에만 리스너가 실행되도록 했습니다. 저장에 실패하면 메일 발송 이벤트 자체가 실행되지 않습니다.',
                '응답 지연 — 여기에 **@Async**를 결합해 메일 발송을 별도 스레드에서 처리하도록 분리해, 메일 발송이 수검자 등록 응답 속도에 영향을 주지 않게 했습니다.',
                '이벤트 발행 트랜잭션 문제 — AFTER_COMMIT은 트랜잭션 내 발행 위치와 무관하게 커밋 후 실행되므로, 위치가 아니라 **어느 트랜잭션에서 발행하는지**가 원인이었습니다. 이벤트 발행을 수검자 번호가 저장되는 트랜잭션으로 옮겨 해결했습니다.',
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
          title: 'SNSB 검사 앱 — 검사 진입 성능 개선',
          skillKeywords: ['Flutter', 'Dart'],
          role: '1차 완성 앱 인수 후 전체 리팩토링 및 성능 개선 단독 진행',
          blocks: [
            { type: 'heading', text: '서비스 정의' },
            {
              type: 'paragraph',
              text:
                '기존에 검사지와 펜으로 진행하던 SNSB-III 검사를 태블릿으로 진행하는 검사자용 앱입니다. 검사자가 앱으로 수검자를 직접 검사하고 채점까지 하며, 검사 결과만 입력하는 표준화 웹·일반(CMS) 웹과 같은 백엔드 API를 씁니다.',
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
                'API 중복 호출(Thundering Herd) — 검사 화면은 28개의 세부 검사 항목으로 구성됩니다. 검사 데이터 조회 API가 항목별로 분리되어 있지 않고 전체 검사 결과를 한 번에 내려주는 구조였기 때문에, 각 항목 컨트롤러가 초기화될 때마다 동일한 전체 조회 API를 각자 독립적으로 호출했습니다. 컨트롤러 초기화가 순차적으로 일어나면서 **동일한 응답을 받기 위한 호출이 최대 28번까지 누적**됐습니다.',
                '전체 페이지 일괄 렌더링 — 페이지 전환마다 위젯 생성과 API 호출에 따른 지연이 발생하는 것을 피하기 위해, IndexedStack으로 약 39개 검사 페이지 위젯을 진입 시점에 모두 빌드하고 각자 API를 호출해두는 방식으로 구현되어 있었습니다. 그 결과 페이지 전환은 빨랐지만, 진입 시점에 위젯 빌드와 API 호출이 한꺼번에 몰려 초기 부하가 컸습니다.',
              ],
            },
            { type: 'heading', text: '해결 방법' },
            {
              type: 'list',
              items: [
                '서버 진입 API 신설 — 근본 원인이 API 설계에 있다고 판단해, 검사 화면 진입에 필요한 수검자 정보·검사 목록·세부 검사 데이터를 한 번에 내려주는 **shell-init 집계 엔드포인트를 백엔드에 추가**했습니다. 앱은 진입 시 이 API를 한 번만 호출해 전체 데이터를 받고, 이를 세부 검사별로 캐시에 적재합니다.',
                'API 중복 호출 제거 — 첫 번째 호출자만 실제 API를 호출하고, 나머지 27개는 동일한 Future를 공유해 대기하도록 처리했습니다. API 응답이 도착하면 결과를 캐시에 저장하고, 이후 요청은 캐시 히트로 즉시 반환되어 **최대 28번이던 API 호출을 1번으로 줄였습니다**. 이 캐시는 세션 동안 재사용되므로 정합성 관리가 필요했습니다. 캐시에 데이터가 없는 경우(캐시 미스)에는 API를 다시 호출하는 fallback을 두었고, 각 세부 페이지의 결과를 종합해 보여주는 검사 결과 페이지에서는 초기에 변경 전 캐시값이 그대로 표시되는 문제가 있어, 세부 페이지에서 값을 변경하면 해당 캐시를 즉시 갱신해 결과 페이지 진입 시 항상 최신 값이 반영되도록 처리했습니다.',
                'Lazy 빌드 전환 — IndexedStack은 유지한 채 children을 지연 생성하도록 변경했습니다. 진입 시점에는 방문하지 않은 페이지를 빈 위젯으로 두고, 페이지를 처음 열 때만 실제 위젯을 빌드해 슬롯을 채웁니다. IndexedStack을 유지했기 때문에 한 번 빌드된 페이지는 트리에 남아 **입력 상태가 그대로 보존**되고, 재방문 시 리빌드도 발생하지 않습니다. 검사 데이터는 앞서 캐시에 적재되어 있어 페이지를 처음 열 때도 추가 API 호출 없이 위젯만 빌드하면 됩니다. 그 결과 페이지 전환 속도는 유지하면서 진입 시점의 초기 부하만 크게 줄일 수 있었습니다.',
              ],
            },
            {
              type: 'image',
              src: snsb3AppPerformance,
              alt: '검사 화면 진입: 중복 호출을 하나로, 빌드는 필요할 때만',
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
                'DB 조회 툴 — 자연어 요청을 SELECT 쿼리로 변환해 조회. 처음에는 코드 레벨에서 SELECT 강제·키워드 블랙리스트로만 검증했으나, **Claude가 툴을 거치지 않고 별도로 확보한 DB 접속 정보로 직접 쿼리를 실행한 사례가 발생**해 코드 레벨 방어만으로는 한계가 있다고 판단. **DB 계정 자체를 SELECT 단일 권한으로 제한**해, 어떤 경로로 접속하든 데이터 변경이 원천적으로 불가능하도록 전환',
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
          skillKeywords: ['NestJS', 'AWS SQS', 'Discord Bot', 'Notion API'],
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
                'DB + AWS SQS 구조로 상태 추적과 장애 복구, Worker 수평 확장이 가능하도록 설계했습니다. 같은 버그에 대한 작업이 중복 실행되지 않는 것이 중요했기 때문에, 중복 제거와 그룹 단위 순서 보장을 제공하는 **SQS FIFO 큐**를 선택했습니다.',
            },
            { type: 'heading', text: '동작 프로세스' },
            {
              type: 'list',
              ordered: true,
              items: [
                'Notion DB를 60초 주기로 Polling해 신규·변경 버그 감지 → Discord 채널에 즉시 알림',
                'Discord 메시지에 Repository 선택·AI Provider 선택·AI 해결 버튼 인터랙션 제공',
                '버튼 클릭 시 Backend가 SQS에 작업을 enqueue, AI Worker가 polling 후 처리',
                'AI Worker는 선택한 Provider(Claude / Gemini / Codex)에 맞는 CLI 명령어를 조합해 선택한 Repository 경로에서 비대화형으로 실행. QA팀이 정해진 양식(문제 상황·재현 단계·예상 결과·실제 결과)으로 작성한 Notion 버그 리포트를 파싱해 프롬프트로 구성한 뒤 넘겨줌',
              ],
            },
            { type: 'heading', text: '한계점 및 개선 방향 — SQS Queue Thrashing' },
            {
              type: 'paragraph',
              text:
                '각 AI Worker는 서로 다른 PC에서 실행되므로, 특정 PC로 전달해야 하는 작업을 SQS 메시지로 전달했습니다. 그런데 SQS는 메시지를 미리 열어볼 수 없고 꺼낸 후에야 내용을 확인할 수 있기 때문에, Worker가 자신의 작업이 아닌 메시지를 꺼낸 경우 다시 큐에 넣는 방식을 사용했습니다. 현재는 Worker 수가 적어 아직 체감되는 문제는 없지만, Worker 수가 늘어나면 다음 두 가지 문제로 이어질 수 있다고 예상했습니다.',
            },
            {
              type: 'list',
              items: [
                'Queue Thrashing — 모든 Worker가 메시지를 꺼냈다 다시 넣기를 반복하면서 실제 처리보다 큐 작업 자체가 폭증',
                'Message Starvation — 대상 Worker가 아닌 다른 Worker들이 메시지를 반복해서 꺼내다 보니, 정작 처리해야 할 Worker에게 메시지가 늦게 도달',
              ],
            },
            {
              type: 'paragraph',
              text: '즉시 적용할 수 있는 개선으로 두 가지를 검토했습니다.',
            },
            {
              type: 'list',
              ordered: true,
              items: [
                '메시지가 여러 번 반환되면 처리 불가 메시지함(DLQ)으로 이동시켜 무한 반복을 차단',
                '꺼낸 메시지를 즉시 다시 넣지 않고 일정 시간 대기 후 넣어 Worker 간 충돌을 줄임',
              ],
            },
            {
              type: 'paragraph',
              text:
                '장기적으로는 Worker별로 메시지를 독립적으로 소비하는 구조로 전환해 경합 자체를 없애는 방향을 고려하고 있습니다. 구체적으로는 **SNS Topic + Worker별 SQS 큐** 조합을 검토하고 있습니다. SNS 구독 필터로 대상 Worker의 큐에만 메시지를 전달하면, Worker가 자신의 작업이 아닌 메시지를 꺼내는 일 자체가 발생하지 않아 경합이 원천적으로 사라집니다.',
            },
            {
              type: 'paragraph',
              text:
                '현재 사내 인프라 규모에서는 현 구조가 요구사항을 충족하므로 단계적으로 개선하고 있습니다.',
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
            { type: 'heading', text: 'Docker 기반 멀티 환경 배포' },
            {
              type: 'paragraph',
              text:
                '셀트리온·디아지오 등 일부 고객사는 보안 정책상 외부 인터넷이 차단된 폐쇄망 온프레미스 서버에만 시스템을 설치할 수 있었고, 다른 고객사는 클라우드(AWS EC2) 환경에 배포해야 했습니다. 동일한 시스템을 두 가지 다른 네트워크 환경에 배포해야 하는 요구사항이었습니다.',
            },
            {
              type: 'paragraph',
              text:
                'React, Spring Boot, Nginx, MariaDB, MongoDB, Redis, MQTT Broker로 구성된 전체 스택을 Docker Compose로 묶어, 온프레미스와 클라우드 양쪽에 동일한 구성으로 배포할 수 있도록 했습니다. 환경별로 달라지는 부분은 도메인·SSL 설정과 외부 네트워크 접근 여부 정도였고, 나머지 애플리케이션 구성은 그대로 재사용해 신규 사업장 배포 시 환경 차이에 따른 추가 작업을 최소화했습니다.',
            },
            { type: 'heading', text: '센서 데이터 보존 정책 — 정기 삭제 배치' },
            {
              type: 'paragraph',
              text:
                'MongoDB에 1초 주기로 누적되는 센서 데이터가 장기 운영 시 스토리지 부담을 일으키는 문제가 있었습니다. 스케줄러로 매일 새벽 3시에 실행되는 배치를 구현해, 6개월이 지난 센서 데이터를 일괄 삭제하도록 했습니다. 삭제 건수와 소요 시간은 운영 로그로 기록해 이상 여부를 확인할 수 있도록 했습니다.',
            },
            { type: 'heading', text: '로그 모니터링 — 로그 정규화 및 Promtail 기반 수집' },
            {
              type: 'paragraph',
              text:
                '모든 애플리케이션 로그를 JSON 형식으로 정규화하고, 요청·MQTT·DB 등 이벤트별 공통 포맷을 정의했습니다. DB·MQTT·요청 지연은 임계값 기반으로 자동 감지해 WARN 레벨로 출력하고, 정규화된 로그는 Promtail로 수집해 Loki에 적재한 뒤 Grafana 대시보드로 시각화해 슬로우 쿼리·인증 오류·디바이스 연결 이상을 모니터링했습니다.',
            },
          ],
        },
      ],
    },
  ],
};

export default career;
