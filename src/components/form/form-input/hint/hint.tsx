import classNames from 'classnames';

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
  const classesActive = classNames(styles.hint, styles.active);
  const classesInactive = classNames(styles.hint, styles.inactive);

  if (!error) {
    return (
      <span className={classesInactive} data-test-id='hint'>
        {hint}
      </span>
    );
  }

  if (errorMessageRequired && isInputFocused && hint) {
    return (
      <span className={classesInactive} data-test-id='hint'>
        {hint}
      </span>
    );
  }

  if (errorMessageRequired) {
    return (
      <span className={classesActive}>
        <Hightlight filter={errorMessageRequired} str={errorMessageRequired} testId='hint' />
      </span>
    );
  }

  if (!isInputFocused && !errorMessageRequired && hint) {
    return (
      <span className={classesActive} data-test-id='hint'>
        <Hightlight filter={hint} str={hint} testId='hint' />
      </span>
    );
  }

  if (typeof errorsMatches === 'string' && hint) {
    return (
      <span className={classesInactive} data-test-id='hint'>
        <Hightlight filter={errorsMatches} str={hint} testId='hint' />
      </span>
    );
  }

  if (Array.isArray(errorsMatches) && hint) {
    return (
      <span className={classesInactive}>
        <Hightlight filter={errorsMatches.join('|')} str={hint} testId='hint' />
      </span>
    );
  }

  return null;
};

export { Hint };
