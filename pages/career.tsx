/* eslint-disable react/jsx-props-no-spreading */
import { Container, Row, Col } from 'reactstrap';
import Head from 'next/head';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { Career } from '../component/career';
import { Footer } from '../component/footer';
import { Style } from '../component/common/Style';
import Payload from '../payload';
import PrintButton from '../component/common/PrintButton';

function CareerPage() {
  const title = `경력기술서 | ${Payload._global.headTitle}`;
  return (
    <>
      <NextSeo {...Payload._global.seo} title={title} />
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href={Payload._global.favicon} />
      </Head>
      <Container style={Style.global}>
        <Row className="mt-5">
          <Col>
            <Link href="/">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>← 이력서로 돌아가기</a>
            </Link>
          </Col>
          <Col className="text-right">
            <PrintButton />
          </Col>
        </Row>
        <Row className="pb-3">
          <Col>
            <h1 style={Style.blue}>경력기술서</h1>
          </Col>
        </Row>
        <Career.Component payload={Payload.career} />
        <Footer.Component payload={Payload.footer} />
      </Container>
    </>
  );
}

export default CareerPage;
