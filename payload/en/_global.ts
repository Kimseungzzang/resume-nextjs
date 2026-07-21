import favicon from '../../asset/favicon.ico';
import previewImage from '../../asset/preview.jpg';
import { IGlobal } from '../../component/common/IGlobal';

const title = 'Seungjun Kim Resume';
const description = 'Resume of developer Seungjun Kim.';

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
          alt: 'Seungjun Kim Resume',
        },
      ],
      type: 'profile',
      profile: {
        firstName: 'Seungjun',
        lastName: 'Kim',
        username: 'Kimseungzzang',
        gender: 'male',
      },
    },
  },
};
