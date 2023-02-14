import { Outlet } from 'react-router-dom';

import { navItems } from '../../data';
import { Container } from '../container';
import { Main } from '../main';
import { NavigationBlock } from '../navigation';

import styles from './layout-main-page.module.scss';

const LayoutMainPage = () => (
  <Container>
    <Main className={styles.main}>
      <aside>
        <NavigationBlock items={navItems} className={styles.nav} testIdPrefix='navigation' />
      </aside>
      <Outlet />
    </Main>
  </Container>
);

export { LayoutMainPage };
