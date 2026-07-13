import { PropsWithChildren } from 'react';
import { Badge } from 'reactstrap';
import { ICareer } from './ICareer';
import { Style } from '../common/Style';
import CareerBlock from './Block';

export default function ProjectSection({
  project,
  index,
}: PropsWithChildren<{ project: ICareer.Project; index: number }>) {
  return (
    <div className={index > 0 ? 'mt-5' : ''}>
      {index > 0 ? <hr /> : ''}
      <h4>{project.title}</h4>
      <div className="mb-2">
        {project.skillKeywords.map((keyword, keywordIndex) => (
          <Badge
            style={Style.skillKeywordBadge}
            key={keywordIndex.toString()}
            color="secondary"
            className="mr-1"
          >
            {keyword}
          </Badge>
        ))}
      </div>
      <i style={Style.gray}>{project.role}</i>
      {project.blocks.map((block, blockIndex) => (
        <CareerBlock block={block} key={blockIndex.toString()} />
      ))}
    </div>
  );
}
