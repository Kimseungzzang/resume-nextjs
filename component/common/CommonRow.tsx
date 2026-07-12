import { PropsWithChildren } from 'react';
import { Badge, Row, Col } from 'reactstrap';
import { IRow } from './IRow';
import { Style } from './Style';
import { CommonDescription } from './CommonDescription';

export function CommonRows({
  index,
  payload,
}: PropsWithChildren<{ payload: IRow.Payload; index: number }>) {
  const { left, right } = payload;

  const isNeedDescriptionPadding = !!(right.title || right.subTitle);

  return (
    <div>
      {index > 0 ? <hr /> : ''}
      <Row>
        <Col sm={12} md={3} className="text-md-right">
          <Row>
            <Col md={12}>
              <h4 style={Style.gray}>{left.title}</h4>
            </Col>
            {left.subTitle ? <Col md={12}>{left.subTitle}</Col> : ''}
          </Row>
        </Col>
        <Col sm={12} md={9}>
          {right.title ? <h4>{right.title}</h4> : ''}
          {right.subTitle ? <i style={Style.gray}>{right.subTitle}</i> : ''}
          {right.summary ? (
            <p className="mt-1 mb-0" style={Style.blue}>
              {right.summary}
            </p>
          ) : (
            ''
          )}
          {right.descriptions ? (
            <CommonDescription
              descriptions={right.descriptions}
              option={{ padding: isNeedDescriptionPadding }}
            />
          ) : (
            ''
          )}
          {createSkillKeywords(right.skillKeywords)}
        </Col>
      </Row>
    </div>
  );
}

function createSkillKeywords(skillKeywords?: string[]) {
  if (!skillKeywords) {
    return null;
  }
  return (
    <div className="pt-2">
      {skillKeywords.map((keyword, index) => (
        <Badge
          style={Style.skillKeywordBadge}
          key={index.toString()}
          color="secondary"
          className="mr-1"
        >
          {keyword}
        </Badge>
      ))}
    </div>
  );
}
