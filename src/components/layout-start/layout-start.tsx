import React from 'react';
import { Outlet } from 'react-router-dom';

import { Loader } from '../loader';

import styles from './layout-start.module.scss';

const LayoutStart = () => (
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

export { LayoutStart };
