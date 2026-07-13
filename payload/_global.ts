import favicon from '../asset/favicon.ico';
import previewImage from '../asset/preview.jpg';
import { IGlobal } from '../component/common/IGlobal';

const title = '김승준 이력서';
const description = '개발자 김승준의 이력서입니다.';

export const _global: IGlobal.Payload = {
  favicon,
  headTitle: title,
  seo: {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: previewImage,
          width: 800,
          height: 600,
          alt: '김승준 이력서',
        },
      ],
      type: 'profile',
      profile: {
        firstName: '승준',
        lastName: '김',
        username: 'Kimseungzzang',
        gender: 'male',
      },
    },
  },
};
