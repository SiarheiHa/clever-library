import { Hightlight } from '../../../hightlight';

import styles from './hint.module.scss';

interface HintProps {
  errorMessageRequired?: string;
  isInputFocused: boolean;
  errorsMatches?: string | string[];
  error: boolean;
  hint?: string;
}

const Hint = ({ error, errorMessageRequired, errorsMatches, hint, isInputFocused }: HintProps) => {
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
  // console.log('!isInputFocused, !errorMessageRequired, hint');
  // console.log(!isInputFocused, !errorMessageRequired, hint);

  if (!isInputFocused && !errorMessageRequired && hint) {
    // console.log('AAAAAAAAAAAAAAA');

    return (
      <span className={styles.hint}>
        <Hightlight filter={hint} str={hint} />
      </span>
    );
  }

  if (typeof errorsMatches === 'string' && hint) {
    // console.log('BBBBBBBBBBB');

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
