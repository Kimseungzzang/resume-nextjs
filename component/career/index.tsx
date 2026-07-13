import { PropsWithChildren } from 'react';
import { ICareer } from './ICareer';
import { PreProcessingComponent } from '../common/PreProcessingComponent';
import CompanySection from './CompanySection';
import PersonalProjectSection from './PersonalProjectSection';

type Payload = ICareer.Payload;

export const Career = {
  Component: ({ payload }: PropsWithChildren<{ payload: Payload }>) => {
    return PreProcessingComponent<Payload>({
      payload,
      component: Component,
    });
  },
};

function Component({ payload }: PropsWithChildren<{ payload: Payload }>) {
  return (
    <div>
      {payload.companies.map((company, index) => (
        <CompanySection company={company} index={index} key={index.toString()} />
      ))}
      {payload.personalProjects ? <PersonalProjectSection list={payload.personalProjects} /> : ''}
    </div>
  );
}
