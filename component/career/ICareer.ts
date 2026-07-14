import { ICommon } from '../common/ICommon';
import { IRow } from '../common/IRow';

export declare namespace ICareer {
  export interface Payload extends ICommon.Payload {
    /** ### 회사별 경력 목록 */
    companies: Company[];

    /** ### 회사 소속이 아닌 개인 프로젝트 목록 */
    personalProjects?: PersonalProject[];
  }

  export interface Company {
    /** ### 회사명 */
    title: string;

    /**
     * ### 재직 기간
     *
     * @example '2026.01 ~ 현재'
     */
    period: string;

    /** ### 직책 */
    positionTitle: string;

    /** ### 회사 내 프로젝트 목록 */
    projects: Project[];
  }

  export interface Project {
    /** ### 프로젝트 제목 */
    title: string;

    /** ### 사용한 기술 스택 */
    skillKeywords: string[];

    /** ### 담당 역할 */
    role: string;

    /** ### 본문 블록 목록 */
    blocks: Block[];
  }

  export interface PersonalProject {
    title: string;
    descriptions: IRow.Description[];
  }

  export type Block =
    | { type: 'heading'; text: string }
    | { type: 'paragraph'; text: string }
    | { type: 'list'; items: string[] }
    | { type: 'code'; code: string }
    | { type: 'image'; src: string; alt: string };
}
