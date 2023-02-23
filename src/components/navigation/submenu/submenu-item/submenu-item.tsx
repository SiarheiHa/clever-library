import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { selectMenuMode, setMenuMode, useAppDispatch, useAppSelector } from '../../../../store';
import { Category } from '../../../../types/types';

import styles from './submenu-item.module.scss';

interface SubmenuItemProps {
  item: Category;
  testIdPrefix?: 'burger' | 'navigation';
  badge?: boolean;
  badgeText?: string;
}

const setActive = ({ isActive }: { isActive: boolean }) => {
  const classes = classNames(styles.link, isActive && styles.active);

  return classes;
};

const SubmenuItem = ({ item, testIdPrefix, badge = false, badgeText = '' }: SubmenuItemProps) => {
  const testIdprops: Record<string, string> = {};
  const { name, path } = item;

  if (testIdPrefix) {
    if (path === 'all') {
      testIdprops['data-test-id'] = `${testIdPrefix}-books`;
    } else {
      testIdprops['data-test-id'] = `${testIdPrefix}-${path}`;
    }
  }

  const dispatch = useAppDispatch();
  const menuMode = useAppSelector(selectMenuMode);

  const closeMenu = () => {
    if (menuMode === 'open') {
      dispatch(setMenuMode({ mode: 'close' }));
    }
  };

  return (
    <div>
      <NavLink to={`books/${path}`} className={setActive} onClick={closeMenu} {...testIdprops}>
        {name}
      </NavLink>
      {badge && (
        <span className={styles.amount} data-test-id={`${testIdPrefix}-book-count-for-${path}`}>
          {badgeText}
        </span>
      )}
    </div>
  );
};

export { SubmenuItem };
