import { Hightlight } from '../../../hightlight';

import styles from './hint.module.scss';

interface HintProps {
  errorMessageRequired?: string;
  errorsMatches?: string | string[];
  error: boolean;
  hint?: string;
}

const Hint = ({ error, errorMessageRequired, errorsMatches, hint }: HintProps) => {
  if (!error) {
    return <span className={styles.hint}>{hint}</span>;
  }
  if (errorMessageRequired) {
    return (
      <span className={styles.hint}>
        <Hightlight filter={errorMessageRequired} str={errorMessageRequired} />
      </span>
    );
  }
  if (typeof errorsMatches === 'string' && hint) {
    return (
      <span className={styles.hint}>
        <Hightlight filter={errorsMatches} str={hint} />
      </span>
    );
  }

  if (Array.isArray(errorsMatches) && hint) {
    return (
      <span className={styles.hint}>
        <Hightlight filter={errorsMatches.join('|')} str={hint} />
      </span>
    );
  }

  return null;
};

export { Hint };
