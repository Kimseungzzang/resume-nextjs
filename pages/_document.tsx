import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class ResumeDocument extends Document {
  render() {
    return (
      <Html lang="ko-KR">
        <Head>
          {/* Step 5: Output the styles in the head  */}
          <meta charSet="utf-8" />
          {/* <meta name="viewport" content="initial-scale=1.0, width=device-width" /> */}
          <link
            href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:300,400,500,700|Parisienne&display=swap&subset=korean"
            rel="stylesheet"
          />
          <link
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Parisienne&display=swap"
            rel="stylesheet"
          />
          <style>{`
            @media print {
              /*
                margin 을 0으로 주면 Chrome 이 자체적으로 붙이는 인쇄 머리말/꼬리말
                (날짜, 페이지 제목, URL, 쪽 번호)이 표시되지 않는다. 대신 여백은
                body padding 으로 직접 재현한다.
              */
              @page {
                margin: 0;
              }
              /*
                padding 은 기본적으로 첫 페이지 위·마지막 페이지 아래에만 붙는다.
                clone 으로 페이지마다 padding 을 다시 그려 모든 페이지에 여백을 둔다.
              */
              body {
                padding: 1.6cm;
                box-decoration-break: clone;
                -webkit-box-decoration-break: clone;
              }
              /* 제목만 페이지 끝에 남고 본문이 다음 페이지로 넘어가지 않게 한다. */
              h1,
              h2,
              h3,
              h4,
              h5,
              h6,
              h4 + *,
              h4 + * + *,
              .pb-3.row {
                break-after: avoid;
                page-break-after: avoid;
              }
              /* 경력기술서의 역할 문구(<i>)는 인라인이라 break-after 가 먹지 않아 블록으로 바꾼다. */
              h4 + .mb-2 + i {
                display: block;
              }
              /*
                메인 페이지의 항목(프로젝트·경력·기술) 하나와 이미지·목록 한 줄은
                페이지 경계에서 쪼개지지 않게 한다.
              */
              .col > div:not([class]) > .row,
              img,
              li {
                break-inside: avoid;
                page-break-inside: avoid;
              }
              p {
                orphans: 3;
                widows: 3;
              }
              /*
                Chrome 은 인쇄 시 기본적으로 색을 절약 모드로 바꿀 수 있다(print-color-adjust: economy).
                파란 제목 색 등이 검정으로 바뀌는 것을 막기 위해 명시적으로 exact 를 강제한다.
              */
              * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
              }
              .no-print {
                display: none !important;
              }
              a[href]::after {
                content: none !important;
              }
              /*
                인쇄 시 Chrome 이 계산하는 페이지 폭이 Bootstrap 의 md 브레이크포인트(768px)보다
                좁아져 반응형 그리드가 세로로 쌓이는 문제를 막기 위해, 실제 사용 중인
                col-md-*, text-md-* 규칙을 미디어 쿼리 조건 없이 강제 적용한다.
              */
              .col-md-3 {
                flex: 0 0 25% !important;
                max-width: 25% !important;
              }
              .col-md-4 {
                flex: 0 0 33.333333% !important;
                max-width: 33.333333% !important;
              }
              .col-md-9 {
                flex: 0 0 75% !important;
                max-width: 75% !important;
              }
              .col-md-12 {
                flex: 0 0 100% !important;
                max-width: 100% !important;
              }
              .text-md-left {
                text-align: left !important;
              }
              .text-md-right {
                text-align: right !important;
              }
              /*
                .text-center 도 !important 를 쓰기 때문에 단일 클래스 선택자로는
                로드 순서에 따라 밀릴 수 있다. 실제 함께 쓰이는 조합 클래스를 그대로
                선택자로 써서 우선순위를 올려 확실히 이기게 한다.
              */
              .text-center.text-md-left {
                text-align: left !important;
              }
              .text-center.text-md-right {
                text-align: right !important;
              }
            }
          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
