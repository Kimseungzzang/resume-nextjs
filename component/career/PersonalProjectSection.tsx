import { PropsWithChildren } from 'react';
import { ICareer } from './ICareer';
import { Style } from '../common/Style';
import { CommonDescription } from '../common/CommonDescription';
import { useLanguage } from '../common/LanguageContext';

export default function PersonalProjectSection({
  list,
}: PropsWithChildren<{ list: ICareer.PersonalProject[] }>) {
  const { lang } = useLanguage();

  return (
    <div className="mt-5 pt-5">
      <h2 style={Style.blue}>{lang === 'en' ? 'Personal Projects' : '개인 프로젝트'}</h2>
      {list.map((item, index) => (
        <div className={index > 0 ? 'mt-4' : 'mt-3'} key={index.toString()}>
          <h4>{item.title}</h4>
          <CommonDescription descriptions={item.descriptions} />
        </div>
      ))}
    </div>
  );
}
