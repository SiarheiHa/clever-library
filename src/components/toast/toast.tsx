import { useEffect } from 'react';
import classNames from 'classnames';

import cross from '../../assets/images/icons/cross.svg';
import { ReactComponent as SuccessIcon } from '../../assets/images/icons/succes.svg';
import { ReactComponent as WarningIcon } from '../../assets/images/icons/warning.svg';
import { useAppDispatch, useAppSelector } from '../../store';
import { hideToast, selectToastState } from '../../store/toast-slice';
import { Button } from '../button';
import { Container } from '../container';

import styles from './toast.module.scss';

const Toast = () => {
  const { isVisible, message, mode } = useAppSelector(selectToastState);

  const dispatch = useAppDispatch();

  const closeToast = () => {
    dispatch(hideToast());
  };

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => dispatch(hideToast()), 4000);
    }
  });

  if (!isVisible) {
    return null;
  }

  const classes = classNames(styles.toast, mode === 'warning' ? styles.warning : styles.success);

  return (
    <Container className={styles.container}>
      <div className={classes} data-test-id='error'>
        <div className={styles.message}>
          {mode === 'warning' ? <WarningIcon /> : <SuccessIcon />}
          <p className={styles.text}>{message}</p>
        </div>
        <Button
          onClick={closeToast}
          className={styles.button}
          shadowed={false}
          bordered={false}
          filtered={false}
          testId='alert-close'
        >
          <img src={cross} className={styles.icon} alt='close' />
        </Button>
      </div>
    </Container>
  );
};

export { Toast };
