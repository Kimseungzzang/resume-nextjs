import { IRow } from '../common/IRow';
import { ICommon } from '../common/ICommon';

export declare namespace IProject {
  /**
   * ### Sample Rendering
   *
   * ![image](https://user-images.githubusercontent.com/8033320/78034257-726f1480-73a2-11ea-9bbe-fc9bde4551d1.png)
   *
   * @example https://github.com/uyu423/resume-nextjs/blob/master/payload/project.ts
   */
  export interface Payload extends ICommon.Payload {
    /** ### 프로젝트 리스트 */
    list: Item[];
  }

  export interface Item {
    /** ### 프로젝트 제목 */
    title: string;

    /** ### 어디서 수행했는지 (or subtitle) */
    where: string;

    /**
     * ### 프로젝트 시작일
     *
     * @format YYYY-MM
     * @example "2018-02"
     */
    startedAt: string;

    /**
     * ### 프로젝트 종료일
     *
     * @format YYYY-MM
     * @example "2021-02"
     * @description `undefined` 일 경우 나타나지 않는다.
     */
    endedAt?: string;

    /**
     * ### 프로젝트 한 줄 요약
     *
     * @description undefined 가 아닐 경우 회사명(where) 아래, 상세 설명 리스트 위에 불릿 없이 표시된다.
     */
    summary?: string;

    /**
     * ### 프로젝트 설명
     */
    descriptions: IRow.Description[];

    /**
     * ### 프로젝트에 사용한 기술 스택
     *
     * @description undefined 가 아닐 경우 설명 리스트 아래에 뱃지 형태로 표시된다.
     */
    skillKeywords?: string[];
  }
}
