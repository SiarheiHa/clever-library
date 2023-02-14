import { FC } from 'react';
import classNames from 'classnames';

import styles from './main.module.scss';

interface MainProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  className?: string;
}

const Main: FC<MainProps> = ({ children, direction = 'row', className }) => {
  const classes = classNames(styles.main, direction === 'column' && styles.column, className);

  return <main className={classes}>{children}</main>;
};

export { Main };
