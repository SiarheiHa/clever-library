import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { selectUserState, useAppSelector } from '../../store';
import { Loader } from '../loader';

import styles from './layout-start.module.scss';

const LayoutStart = () => {
  const navigate = useNavigate();
  const { userInfo } = useAppSelector(selectUserState);
  const jwt = userInfo?.jwt;

  useEffect(() => {
    if (jwt) {
      navigate('/books/all');
    }
  }, [jwt, navigate]);

  return (
    <React.Fragment>
      <div className={styles.overlay}>
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
