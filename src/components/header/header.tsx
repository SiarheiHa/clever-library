import { NavLink } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { AdaptiveMenu } from '../adaptive-menu';
import { PersonBlock } from '../person-block';

import styles from './header.module.scss';

const Header = () => (
  <header className={styles.header}>
    <NavLink to='/'>
      <Logo className={styles.logo} />
    </NavLink>
    <AdaptiveMenu />
    <h1 className={styles.title}>Библиотека</h1>
    <PersonBlock className={styles.person} />
  </header>
);

export { Header };
