import cross from '../../assets/images/icons/cross.svg';
import { ReactComponent as WarningIcon } from '../../assets/images/icons/warning.svg';
import { Button } from '../button';
import { Container } from '../container';

import styles from './toast.module.scss';

const TEXT = 'Что-то пошло не так. Обновите страницу через некоторое время.';

const Toast = () => {
  console.log('error-block');

  return (
    <Container className={styles.container}>
      <div className={styles.toast}>
        <div className={styles.message}>
          <WarningIcon />
          <p className={styles.text}>{TEXT}</p>
        </div>
        <Button onClick={() => {}} className={styles.button} shadowed={false} bordered={false} filtered={false}>
          <img src={cross} className={styles.icon} alt='close' />
        </Button>
      </div>
    </Container>
  );
};

export { Toast };
