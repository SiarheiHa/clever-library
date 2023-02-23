import { useState } from 'react';
import classNames from 'classnames';

import cross from '../../assets/images/icons/cross.svg';
import { ReactComponent as SearchIcon } from '../../assets/images/icons/search.svg';
import { ReactComponent as SearchActiveIcon } from '../../assets/images/icons/search_active.svg';
import { Button } from '../button';

import styles from './input.module.scss';

interface InputProps {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onButtonClick: () => void;
  value: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ onChange, className, value, onButtonClick }) => {
  const [isInputOpen, setInputOpen] = useState<boolean>(false);
  const [isFocused, setFocus] = useState(false);

  const openInput = () => {
    setInputOpen(true);
    onButtonClick();
  };

  const closeInput = () => {
    setInputOpen(false);
    onButtonClick();
  };

  const onFocus = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
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
        {isFocused ? <SearchActiveIcon className={styles.icon} /> : <SearchIcon className={styles.icon} />}
      </Button>
      <input
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        type='text'
        className={inputClasses}
        placeholder='Поиск книги или автора…'
        data-test-id='input-search'
      />
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
