import classNames from 'classnames';

import { ReactComponent as Avatar } from '../../assets/images/avatar.svg';

import styles from './person-block.module.scss';

const PersonBlock = ({ className }: { className?: string }) => {
  const classes = classNames(className, styles.wrapper);

  return (
    <div className={classes}>
      <span className={styles.greeting}>Привет, Иван!</span>
      <div className={styles.image_wrapper}>
        <Avatar className={styles.avatar} />
      </div>
    </div>
  );
};

export { PersonBlock };
