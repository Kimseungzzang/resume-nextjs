import { PropsWithChildren } from 'react';
import { ICareer } from './ICareer';
import { Style } from '../common/Style';
import ProjectSection from './ProjectSection';

export default function CompanySection({
  company,
  index,
}: PropsWithChildren<{ company: ICareer.Company; index: number }>) {
  return (
    <div className={index > 0 ? 'mt-5 pt-5' : 'mt-5'}>
      <h2 style={Style.blue}>{company.title}</h2>
      <div className="mb-4">
        <span style={Style.gray}>{company.period}</span>
        <span className="ml-2">
          <i style={Style.gray}>{company.positionTitle}</i>
        </span>
      </div>
      {company.projects.map((project, projectIndex) => (
        <ProjectSection project={project} index={projectIndex} key={projectIndex.toString()} />
      ))}
    </div>
  );
}
