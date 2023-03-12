import { useState } from 'react';
import classNames from 'classnames';

import { ReactComponent as Avatar } from '../../assets/images/avatar.svg';
import { resetUserState, setMenuMode, useAppDispatch } from '../../store';

import styles from './person-block.module.scss';

const PersonBlock = ({ className }: { className?: string }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const classes = classNames(className, styles.wrapper);
  const menuClasses = classNames(styles.menu, menuVisible && styles.show);
  const dispatch = useAppDispatch();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const singout = () => {
    localStorage.clear();
    dispatch(setMenuMode({ mode: 'close' }));
    dispatch(resetUserState());
  };

  return (
    <div className={classes}>
      <span className={styles.greeting}>Привет, Иван!</span>
      <div className={styles.image_wrapper}>
        <Avatar className={styles.avatar} onClick={toggleMenu} />
      </div>
      <div className={menuClasses}>
        <p className={styles.item}>Профиль</p>
        <button type='button' onClick={singout} className={styles.button}>
          <p className={styles.item}>Выход</p>
        </button>
      </div>
    </div>
  );
};

export { PersonBlock };
