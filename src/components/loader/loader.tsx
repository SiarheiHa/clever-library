import Lottie from 'lottie-react';

import spinner from './spinner.json';

import styles from './loader.module.scss';

const Loader = () => (
  <div className={styles.backdrop}>
    <Lottie animationData={spinner} loop={true} rendererSettings={{ className: styles.spinner }} />
  </div>
);

export { Loader };
