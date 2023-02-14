import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import сhevronColored from '../../../assets/images/icons/chevron_colored.svg';
import сhevron from '../../../assets/images/icons/сhevron.svg';
import { testIds } from '../../../data';
import { selectMenuMode, setMenuMode, useAppDispatch, useAppSelector } from '../../../store';
import { Category, NavItem } from '../../../types/types';
import { Button } from '../../button';
import { Submenu } from '../submenu';

import styles from './menu-item.module.scss';

interface MenuItemProps {
  item: NavItem | Category;
  testIdPrefix?: 'burger' | 'navigation';
  isSubmenuOpen?: boolean;
  toggleSubmenu?: () => void;
}

const hasSubLinks = (item: NavItem | Category): item is Required<NavItem> => 'submenu' in item;

const MenuItem: React.FC<MenuItemProps> = ({ item, isSubmenuOpen, toggleSubmenu = () => {}, testIdPrefix }) => {
  const { name, path } = item;
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const menuMode = useAppSelector(selectMenuMode);
  const isCurrentPage = () => {
    if (pathname.includes(path.slice(0, 5))) {
      return true;
    }
    if (pathname === '/' && path === 'books/all') {
      return true;
    }

    return false;
  };
  const setActive = ({ isActive }: { isActive: boolean }) => {
    const linkClasses = classNames(styles.link, (isActive || isCurrentPage()) && styles.active);

    return linkClasses;
  };

  const submenuClasses = classNames({ [styles.hide]: !isSubmenuOpen });

  const submenu = hasSubLinks(item) ? (
    <Submenu submenu={item.submenu} className={submenuClasses} testIdPrefix={testIdPrefix} />
  ) : null;

  const handleClick = () => {
    // adaptive menu
    if (!isCurrentPage() && menuMode === 'open') {
      dispatch(setMenuMode({ mode: 'close' }));
    }

    // submenu
    if (path.includes('books') || (!path.includes('books') && isSubmenuOpen)) {
      toggleSubmenu();
    }
  };

  const buttonClasses = classNames(styles.button, { [styles.revert]: !isSubmenuOpen });

  return (
    <React.Fragment>
      <NavLink to={path} className={setActive} onClick={handleClick} data-test-id={`${testIdPrefix}-${testIds[path]}`}>
        <span>{name}</span>
        {submenu && (
          <Button onClick={() => {}} className={buttonClasses} shadowed={false} bordered={false} filtered={false}>
            <img src={isCurrentPage() ? сhevronColored : сhevron} className={styles.icon} alt='close' />
          </Button>
        )}
      </NavLink>
      {submenu}
    </React.Fragment>
  );
};

export { MenuItem };
