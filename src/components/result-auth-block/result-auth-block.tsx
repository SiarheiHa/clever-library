import { Button } from '../button';
import { FormTitle } from '../form';

import styles from './result-auth-block.module.scss';

interface ResultAuthBlockProps {
  title: string;
  text: string;
  buttonText: string;
  onClick: () => void;
}

const ResultAuthBlock = ({ buttonText, onClick, text, title }: ResultAuthBlockProps) => (
  <div className={styles.wrapper}>
    <FormTitle title={title} className={styles.header} />
    <p className={styles.message}>{text}</p>
    <Button onClick={onClick} contained={true} className={styles.button}>
      {buttonText}
    </Button>
  </div>
);

export { ResultAuthBlock };
