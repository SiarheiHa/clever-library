import { ReactComponent as FB } from '../../assets/images/social/fb.svg';
import { ReactComponent as Linkedin } from '../../assets/images/social/in.svg';
import { ReactComponent as Instagram } from '../../assets/images/social/insta.svg';
import { ReactComponent as VK } from '../../assets/images/social/vk.svg';

import styles from './social-list.module.scss';

const SOCIAL = [
  {
    name: 'facebook',
    href: 'https://www.facebook.com',
    logo: <FB />,
  },
  {
    name: 'instagram',
    href: 'https://www.instagram.com',
    logo: <Instagram />,
  },
  {
    name: 'vk',
    href: 'https://www.vk.com',
    logo: <VK />,
  },
  {
    name: 'linkedin',
    href: 'https://www.linkedin.com',
    logo: <Linkedin />,
  },
];

const SocialList = () => (
  <ul className={styles.list}>
    {SOCIAL.map(({ href, logo }) => (
      <li key={href} className={styles.item}>
        <a href={href} target='_blank' rel='noreferrer'>
          {logo}
        </a>
      </li>
    ))}
  </ul>
);

export { SocialList };
