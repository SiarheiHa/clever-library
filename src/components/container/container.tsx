import classNames from 'classnames';

import styles from './container.module.scss';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  const classes = classNames(styles.container, className);

  return <div className={classes}>{children}</div>;
};

export { Container };
