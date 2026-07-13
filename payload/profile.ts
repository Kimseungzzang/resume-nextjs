import { faBlog, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { faBell } from '@fortawesome/free-regular-svg-icons';
import { IProfile } from '../component/profile/IProfile';
import image from '../asset/sample_tux.png';

const profile: IProfile.Payload = {
  disable: false,

  image,
  name: {
    title: '김승준',
    small: '백엔드 개발자 · 2년차',
  },
  contact: [
    {
      title: '99kimst@gmail.com',
      link: 'mailto:99kimst@gmail.com',
      icon: faEnvelope,
    },
    {
      title: '010-4572-9858',
      link: 'tel:010-4572-9858',
      icon: faPhone,
    },
    {
      link: 'https://github.com/Kimseungzzang',
      icon: faGithub,
    },
    {
      link: 'https://velog.io/@kimseungzzang/posts',
      icon: faBlog,
    },
  ],
  notice: {
    title: '현재 휴브알엔씨에서 개발자로 재직 중입니다.',
    icon: faBell,
  },
  detailButton: {
    title: '경력기술서 보기',
    href: '/career',
  },
};

export default profile;
