import React, { useState } from 'react';
import classNames from 'classnames';

import { userControllItems } from '../../data';
import { NavItem } from '../../types/types';

import { MenuItem } from './menu-item';

import styles from './navigation-block.module.scss';

interface NavigationBlockProps {
  items: NavItem[];
  userControlls?: boolean;
  className?: string;
  testIdPrefix?: 'burger' | 'navigation';
}

const NavigationBlock: React.FC<NavigationBlockProps> = ({ items, className, userControlls, testIdPrefix }) => {
  const classes = classNames(styles.nav, className);

  const [isSubmenuOpen, setSubmenuOpen] = useState(true);
  const toggleSubmenu = () => {
    setSubmenuOpen(!isSubmenuOpen);
  };

  const testIdprops = testIdPrefix === 'burger' ? { 'data-test-id': 'burger-navigation' } : {};

  return (
    <nav className={classes} {...testIdprops}>
      <ul>
        {items.map((item) => (
          <li key={item.path} className={styles.item}>
            <MenuItem
              item={item}
              testIdPrefix={testIdPrefix}
              isSubmenuOpen={isSubmenuOpen}
              toggleSubmenu={toggleSubmenu}
            />
          </li>
        ))}
      </ul>
      {userControlls && (
        <React.Fragment>
          <div className={styles.line} />
          <ul className={styles.nav}>
            {userControllItems.map((item) => (
              <li key={item.path} className={styles.item}>
                <MenuItem item={item} />
              </li>
            ))}
          </ul>
        </React.Fragment>
      )}
    </nav>
  );
};

export { NavigationBlock };
