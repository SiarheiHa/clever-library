import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { useGetCategoriesQuery } from '../../api';
import { useLazyGetCategoriesQuery } from '../../api/categories-api';
import { userControllItems } from '../../data';
import { hideLoader, selectLoaderVisibility, showLoader, showToast, useAppDispatch, useAppSelector } from '../../store';
import { NavItem } from '../../types/types';

import { MenuItem } from './menu-item';

import styles from './navigation-block.module.scss';

interface NavigationBlockProps {
  userControlls?: boolean;
  className?: string;
  testIdPrefix?: 'burger' | 'navigation';
}

const NavigationBlock: React.FC<NavigationBlockProps> = ({ className, userControlls, testIdPrefix }) => {
  const [fetchCategories, { data: categories, isError: categoriesError, isLoading, isSuccess, isUninitialized }] =
    useLazyGetCategoriesQuery();

  const isLoaderVisible = useAppSelector(selectLoaderVisibility);
  const dispatch = useAppDispatch();
  console.log('aside');

  useEffect(() => {
    fetchCategories('');
  }, [fetchCategories]);

  useEffect(() => {
    if (categoriesError) {
      dispatch(
        showToast({ mode: 'warning', message: 'Что-то пошло не так. Обновите страницу через некоторое время.' })
      );
    }
  }, [categoriesError, dispatch]);

  useEffect(() => {
    if (isLoading && !isLoaderVisible && !isSuccess) {
      console.log('show1');
      // dispatch(showLoader());
    } else if (!isLoading && isLoaderVisible && isUninitialized) {
      console.log('nav block hide loader');
      // dispatch(hideLoader());
    }
  }, [dispatch, isLoaderVisible, isLoading, isSuccess, isUninitialized]);

  const items: NavItem[] = [
    {
      name: 'Витрина книг',
      path: 'books/all',
      submenu: {
        subtitle: 'Все книги',
        items: categories || [],
      },
    },
    {
      name: 'Правила пользования',
      path: 'terms',
    },
    {
      name: 'Договор оферты',
      path: 'contract',
    },
  ];

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
