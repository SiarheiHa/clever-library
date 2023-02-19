import classNames from 'classnames';

import { SubMenu } from '../../../types/types';

import { SubmenuItem } from './submenu-item';

import styles from './submenu.module.scss';

interface SubmenuProps {
  submenu: SubMenu;
  className?: string;
  testIdPrefix?: 'burger' | 'navigation';
}

const Submenu = ({ submenu, testIdPrefix, className }: SubmenuProps) => {
  const { items, subtitle } = submenu;
  const classes = classNames(styles.list, className);

  return (
    <ul className={classes}>
      <li>
        <SubmenuItem
          item={{
            name: subtitle,
            path: 'all',
            id: -1,
          }}
          testIdPrefix={testIdPrefix}
        />
      </li>
      {items.map((item) => (
        <li key={item.name}>
          <SubmenuItem item={item} badge={true} />
        </li>
      ))}
    </ul>
  );
};

export { Submenu };
