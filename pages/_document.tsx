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
              body {
                padding: 1.6cm;
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
