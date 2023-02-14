import { useRef } from 'react';
import classNames from 'classnames';

import { navItems } from '../../data';
import { useOnClickOutside } from '../../hooks/use-onclick-outside';
import { selectMenuMode, setMenuMode, useAppDispatch, useAppSelector } from '../../store';
import { Burger } from '../burger';
import { NavigationBlock } from '../navigation';

import styles from './adaptive-menu.module.scss';

const AdaptiveMenu = () => {
  const menuMode = useAppSelector(selectMenuMode);
  const classes = classNames(styles.nav, menuMode === 'open' && styles.open);
  const dispatch = useAppDispatch();
  const menuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(menuRef, () => {
    dispatch(setMenuMode({ mode: 'close' }));
  });

  return (
    <div ref={menuRef}>
      <Burger className={styles.burger} />
      <NavigationBlock items={navItems} className={classes} userControlls={true} testIdPrefix='burger' />
    </div>
  );
};

export { AdaptiveMenu };
