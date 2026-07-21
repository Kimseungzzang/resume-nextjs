import profile from './profile';
import introduce from './introduce';
import skill from './skill';
import experience from './experience';
import openSource from './openSource';
import project from './project';
import presentation from './presentation';
import education from './education';
import article from './article';
import etc from './etc';
import footer from './footer';
import career from './career';

import { _global } from './_global';

import enProfile from './en/profile';
import enIntroduce from './en/introduce';
import enSkill from './en/skill';
import enExperience from './en/experience';
import enOpenSource from './en/openSource';
import enProject from './en/project';
import enPresentation from './en/presentation';
import enEducation from './en/education';
import enArticle from './en/article';
import enEtc from './en/etc';
import enFooter from './en/footer';
import enCareer from './en/career';

import { _global as enGlobal } from './en/_global';

import { Lang } from '../component/common/LanguageContext';
import { IProfile } from '../component/profile/IProfile';
import { IIntroduce } from '../component/introduce/IIntroduce';
import { ISkill } from '../component/skill/ISkill';
import { IOpenSource } from '../component/openSource/IOpenSource';
import { IExperience } from '../component/experience/IExperience';
import { IProject } from '../component/project/IProject';
import { IPresentation } from '../component/presentation/IPresentation';
import { IEducation } from '../component/education/IEducation';
import { IEtc } from '../component/etc/IEtc';
import { IFooter } from '../component/footer/IFooter';
import { IGlobal } from '../component/common/IGlobal';
import { IArticle } from '../component/article/IArticle';
import { ICareer } from '../component/career/ICareer';

interface Payload {
  profile: IProfile.Payload;
  introduce: IIntroduce.Payload;
  skill: ISkill.Payload;
  openSource: IOpenSource.Payload;
  experience: IExperience.Payload;
  project: IProject.Payload;
  presentation: IPresentation.Payload;
  education: IEducation.Payload;
  article: IArticle.Payload;
  etc: IEtc.Payload;
  footer: IFooter.Payload;
  career: ICareer.Payload;

  _global: IGlobal.Payload;
}

const koPayload: Payload = {
  profile,
  introduce,
  skill,
  openSource,
  experience,
  project,
  presentation,
  article,
  education,
  etc,
  footer,
  career,

  _global,
};

const enPayload: Payload = {
  profile: enProfile,
  introduce: enIntroduce,
  skill: enSkill,
  openSource: enOpenSource,
  experience: enExperience,
  project: enProject,
  presentation: enPresentation,
  article: enArticle,
  education: enEducation,
  etc: enEtc,
  footer: enFooter,
  career: enCareer,

  _global: enGlobal,
};

export function getPayload(lang: Lang): Payload {
  return lang === 'en' ? enPayload : koPayload;
}

export default koPayload;
