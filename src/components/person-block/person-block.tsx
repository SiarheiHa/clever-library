import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { useGetCurrentUserQuery } from '../../api/current-user-api';
import { ReactComponent as CatAvatar } from '../../assets/images/cat-avatar.svg';
import { logOut, setMenuMode, useAppDispatch } from '../../store';
import { getURI } from '../../utils';

import styles from './person-block.module.scss';

const PersonBlock = ({ className }: { className?: string }) => {
  const { data } = useGetCurrentUserQuery('1');
  const classes = classNames(className, styles.wrapper);
  const dispatch = useAppDispatch();

  // console.log(data);

  const singout = () => {
    localStorage.clear();
    dispatch(setMenuMode({ mode: 'close' }));
    dispatch(logOut());
  };

  if (!data) {
    return null;
  }

  const { firstName, avatar } = data;

  return (
    <div className={classes}>
      <span className={styles.greeting}>{`Привет, ${firstName}!`} </span>
      <div className={styles.image_wrapper}>
        {avatar ? (
          <img src={getURI(avatar)} alt='ava' className={styles.avatar} />
        ) : (
          <CatAvatar className={styles.avatar} />
        )}
      </div>
      <div className={styles.menu}>
        <Link to='/profile'>
          <p className={styles.item} data-test-id='profile-button'>
            Профиль
          </p>
        </Link>
        <button type='button' onClick={singout} className={styles.button}>
          <p className={styles.item}>Выход</p>
        </button>
      </div>
    </div>
  );
};

export { PersonBlock };
