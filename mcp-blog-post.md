# 내가 사내 MCP 서버를 도입하게 된 이유

## 문제 상황

개발 중 API 스펙 확인이 필요할 때마다 Swagger UI를 별도로 열고, 데이터 확인을 위해 DBeaver를 켜고, 에러가 발생하면 Sentry 대시보드를 확인하는 등 컨텍스트 전환 비용이 반복적으로 발생했다. 2인뿐인 적은 인원으로 개발하다 보니 이런 단순 확인 작업에 쓰는 시간이 적지 않았다.

이런 반복 업무를 AI가 직접 수행할 수 있도록, 사내 인프라와 AI를 직접 연결하는 MCP 서버를 구현해 생산성을 높이고자 했다.

## 구현 내용

- **Swagger 연동 툴**: AI가 사내 API 명세를 직접 조회해 엔드포인트·파라미터·응답 구조를 파악
- **DB 조회 툴**: AI가 자연어로 데이터 조회 요청을 받아 실제 DB에서 결과를 확인. 코드 레벨에서 SELECT 쿼리만 허용하고 INSERT·UPDATE·DELETE 등 데이터 변경 쿼리는 차단해 AI가 데이터를 임의로 수정할 수 없도록 처리
- **Sentry 연동 툴**: AI가 Sentry API를 통해 최근 에러 발생 현황과 상세 내역을 직접 조회
- Spring Boot 기반으로 MCP 프로토콜을 구현해 Claude 등 AI 클라이언트와 연동

![사내 MCP 서버 구성](./mcp-server-architecture.png)

## DB 조회 툴 — SQL 검증 3단계

Claude는 자연어 요청을 SELECT SQL 문자열로 직접 생성해 도구 호출 인자로 전달하고, 서버는 이 문자열을 그대로 실행한다. LLM이 생성한 임의의 문자열이 DB에 곧바로 실행되는 구조이기 때문에, 코드 레벨에서 3단계 방어 로직을 뒀다.

**1. SELECT 강제 (validateQuery)** — 쿼리가 SELECT로 시작하지 않으면 즉시 차단한다.

```kotlin
if (!upper.startsWith("SELECT")) {
    throw IllegalArgumentException("SELECT 쿼리만 허용됩니다")
}
```

**2. 키워드 블랙리스트 (BLOCKED_KEYWORDS)** — SELECT로 시작해도 쿼리 문자열에 아래 키워드가 포함되어 있으면 차단한다. `SELECT 1; DROP TABLE users`처럼 세미콜론으로 명령을 이어붙이는 인젝션을 막기 위함이다.

```kotlin
private val BLOCKED_KEYWORDS = setOf(
    "INSERT", "UPDATE", "DELETE", "DROP", "TRUNCATE", "ALTER", "CREATE", "GRANT", "REVOKE"
)
```

**3. 민감 컬럼 마스킹 (SENSITIVE_COLUMNS)** — 검증을 통과해 조회가 성공해도, 응답에 포함된 민감 컬럼 값은 `***`로 치환해 반환한다.

```kotlin
private val SENSITIVE_COLUMNS = setOf(
    "password", "passwd", "secret", "token",
    "access_token", "refresh_token", "api_key"
)
```

테이블 목록 조회(`listTables`)·스키마 조회(`getTableSchema`)는 SQL을 직접 받지 않고 `information_schema` 같은 시스템 뷰만 조회하도록 고정해 인젝션 가능성 자체를 없앴고, 특정 테이블 조회(`queryTable`)는 테이블명을 영문·숫자·언더스코어로만 검증해 인젝션을 차단했다.

## 한계점 — 툴 우회와 DB 계정 권한 제한

코드 레벨 검증만으로는 완전한 방어가 되지 않는다는 걸 실제로 겪었다. Claude가 `db_query` 툴을 거치지 않고, 별도로 확보한 DB 접속 정보로 DB에 직접 접속해 쿼리를 실행해버린 사례가 있었다. 이 경우 SELECT 강제·키워드 블랙리스트 등 애플리케이션 코드에 구현한 검증 로직 자체가 통째로 우회되기 때문에, 코드 레벨 방어만으로는 근본적인 해결이 되지 않는다고 판단했다.

이를 해결하기 위해 MCP 서버가 사용하는 DB 계정 자체의 권한을 SELECT 단일 권한으로 제한했다. 툴 코드를 우회해 어떤 경로로 접속하더라도 DB 계정 권한상 INSERT·UPDATE·DELETE 등의 실행이 원천적으로 불가능해지므로, 애플리케이션 로직에 의존하지 않는 방어선을 확보할 수 있었다.

## Claude ↔ MCP 서버 통신 구조

Claude와 MCP 서버는 HTTP로 통신한다. Claude가 도구 호출이 필요하다고 판단하면 MCP 서버에 "어떤 도구를, 어떤 입력값으로 실행해달라"는 내용을 담은 요청을 보내고, MCP 서버는 도구를 실행한 뒤 그 결과를 JSON으로 응답한다.

예를 들어 개발자가 "최근에 등록된 수검자 5명의 상태를 보여줘"라고 물으면, Claude는 아래와 같은 요청을 MCP 서버로 보낸다.

```
POST /mcp  (도구 호출 요청)

{
  "tool": "db_query",
  "input": { "query": "최근 등록된 수검자 5명 조회" }
}
```

MCP 서버는 실제 DB에서 SELECT 쿼리를 실행한 뒤, 결과를 아래와 같은 JSON으로 응답한다.

```json
{
  "tool": "db_query",
  "status": "success",
  "rowCount": 5,
  "rows": [
    { "id": 1031, "name": "홍길동", "status": "등록완료", "createdAt": "2026-06-12" },
    { "id": 1030, "name": "김민수", "status": "검사중", "createdAt": "2026-06-12" }
  ]
}
```

Claude는 이 결과를 그대로 보여주지 않고, 사람이 읽기 쉬운 형태로 정리해서 답변한다.

```
최근 등록된 수검자 5명 중 일부입니다.

- 홍길동 (ID 1031) — 등록완료, 2026-06-12
- 김민수 (ID 1030) — 검사중, 2026-06-12

나머지 3건도 필요하면 보여드릴게요.
```

## 연속 도구 호출 (멀티스텝)

한 번의 도구 호출 결과만으로 답변할 수 없는 경우도 있다. 예를 들어 "수검자 1031번의 최근 검사 점수를 알려줘"라는 질문은, 먼저 수검자 ID로 검사 ID를 조회한 뒤, 그 검사 ID로 점수를 다시 조회해야 한다. 이런 경우 Claude는 첫 번째 도구 호출 결과를 받은 뒤, 그 결과를 바탕으로 두 번째 도구 호출 요청을 MCP 서버에 다시 보낸다.

```
1차 요청: db_query("examinee_id=1031의 examId 조회")
1차 응답: { "rows": [ { "examId": 5021 } ] }

2차 요청: db_query("examId=5021의 점수 조회")
2차 응답: { "rows": [ { "score": 87, "completedAt": "2026-06-10" } ] }

최종 답변: 수검자 1031번은 2026-06-10에 검사를 완료했고 점수는 87점입니다.
```

이렇게 도구 호출 → 결과 확인 → 추가 도구 호출 여부 판단을 필요한 만큼 반복하는 방식으로, 복잡한 질문도 여러 번의 HTTP 요청/응답을 거쳐 하나의 답변으로 정리된다.

## 도입 효과 및 관점

API 명세·DB 데이터·에러 현황을 AI가 직접 참조할 수 있게 되면서, 적은 인원으로도 반복적인 확인 작업에 쓰는 시간을 크게 줄일 수 있었다. 단순히 툴을 사용하는 걸 넘어 MCP 서버를 직접 구현한 경험을 통해, AI를 개발 워크플로우의 일부로 통합하는 방법에 대한 실질적인 이해를 쌓았다.
