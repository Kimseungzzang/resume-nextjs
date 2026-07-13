import { PropsWithChildren } from 'react';
import { ICareer } from './ICareer';
import { Style } from '../common/Style';
import { HrefTargetBlank } from '../common';

export default function PersonalProjectSection({
  list,
}: PropsWithChildren<{ list: ICareer.PersonalProject[] }>) {
  return (
    <div className="mt-5 pt-5">
      <h2 style={Style.blue}>개인 프로젝트</h2>
      {list.map((item, index) => (
        <div className={index > 0 ? 'mt-4' : 'mt-3'} key={index.toString()}>
          <h4>{item.title}</h4>
          <p className="mb-1">{item.description}</p>
          {item.href ? <HrefTargetBlank url={item.href} /> : ''}
        </div>
      ))}
    </div>
  );
}
