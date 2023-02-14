import { useState } from 'react';
import classNames from 'classnames';

import cross from '../../assets/images/icons/cross.svg';
import search from '../../assets/images/icons/search.svg';
import { Button } from '../button';

import styles from './input.module.scss';

interface InputProps {
  onChange: () => void;
  onButtonClick: () => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({ onChange, className, onButtonClick }) => {
  const [isInputOpen, setInputOpen] = useState<boolean>(false);

  const openInput = () => {
    setInputOpen(true);
    onButtonClick();
  };

  const closeInput = () => {
    setInputOpen(false);
    onButtonClick();
  };

  const classes = classNames(styles.wrapper, { [styles.open]: isInputOpen }, className);
  const closeBtnClasses = classNames(styles.button, { [styles.hidden]: !isInputOpen });
  const searchBtnClasses = classNames(styles.button, styles.disabled, { [styles.hidden]: isInputOpen });
  const inputClasses = classNames(styles.input, { [styles.show]: isInputOpen });

  return (
    <div className={classes}>
      <Button
        onClick={openInput}
        className={searchBtnClasses}
        shadowed={false}
        bordered={false}
        testId='button-search-open'
      >
        <img src={search} className={styles.icon} alt='search icon' />
      </Button>
      <input type='text' className={inputClasses} placeholder='Поиск книги или автора…' data-test-id='input-search' />
      <Button
        onClick={closeInput}
        className={closeBtnClasses}
        shadowed={false}
        bordered={false}
        filtered={false}
        testId='button-search-close'
      >
        <img src={cross} className={styles.icon} alt='close' />
      </Button>
    </div>
  );
};

export { Input };
