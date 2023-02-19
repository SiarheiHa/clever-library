import { SocialList } from '../social';

import styles from './footer.module.scss';

const Footer = () => (
  <div className={styles.footer}>
    <p className={styles.copyright}>© 2020-2023 Cleverland. Все права защищены.</p>
    <SocialList />
  </div>
);

export { Footer };
