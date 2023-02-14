import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { selectMenuMode, setMenuMode, useAppDispatch, useAppSelector } from '../../../../store';
import { Category } from '../../../../types/types';

import styles from './submenu-item.module.scss';

interface SubmenuItemProps {
  item: Category;
  testIdPrefix?: 'burger' | 'navigation';
}

const setActive = ({ isActive }: { isActive: boolean }) => {
  const classes = classNames(styles.link, isActive && styles.active);

  return classes;
};

const SubmenuItem = ({ item, testIdPrefix }: SubmenuItemProps) => {
  const testIdprops: Record<string, string> = {};

  if (testIdPrefix) {
    testIdprops['data-test-id'] = `${testIdPrefix}-books`;
  }

  const { amount, name, path } = item;
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const menuMode = useAppSelector(selectMenuMode);

  const isCurrentPage = () => pathname.includes(path);

  const closeMenu = () => {
    if (!isCurrentPage() && menuMode === 'open') {
      dispatch(setMenuMode({ mode: 'close' }));
    }
  };

  return (
    <NavLink to={path} className={setActive} onClick={closeMenu} {...testIdprops}>
      <p>
        {name}
        <span className={styles.amount}>{amount}</span>
      </p>
    </NavLink>
  );
};

export { SubmenuItem };
