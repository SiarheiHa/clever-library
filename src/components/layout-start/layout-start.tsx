import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { selectAuthState, useAppSelector } from '../../store';
import { Loader } from '../loader';

import styles from './layout-start.module.scss';

const LayoutStart = () => {
  const navigate = useNavigate();
  const { userAuthData } = useAppSelector(selectAuthState);
  const uid = userAuthData?.uid;

  useEffect(() => {
    if (uid) {
      navigate('/books/all');
    }
  }, [uid, navigate]);

  return (
    <React.Fragment>
      <div className={styles.overlay} data-test-id='auth'>
        <div className={styles.outlet}>
          <h2 className={styles.brand}>Cleverland</h2>
          <Outlet />
        </div>
      </div>
      <Loader />
    </React.Fragment>
  );
};

export { LayoutStart };
