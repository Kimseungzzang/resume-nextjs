import { faBlog, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { faBell } from '@fortawesome/free-regular-svg-icons';
import { IProfile } from '../../component/profile/IProfile';
import image from '../../asset/profile.jpg';

const profile: IProfile.Payload = {
  disable: false,

  image,
  name: {
    title: 'Seungjun Kim',
    small: 'Backend Developer · 2 years',
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
    title: 'Currently working as a developer at HBRC.',
    icon: faBell,
  },
  detailButton: {
    title: 'View Career Details',
    href: '/career',
  },
};

export default profile;
