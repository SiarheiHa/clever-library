import Lottie from 'lottie-react';

import { selectLoaderVisibility, useAppSelector } from '../../store';

import spinner from './spinner.json';

import styles from './loader.module.scss';

const Loader = () => {
  const isVisible = useAppSelector(selectLoaderVisibility);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.backdrop}>
      <Lottie animationData={spinner} loop={true} rendererSettings={{ className: styles.spinner }} />
    </div>
  );
};

export { Loader };
