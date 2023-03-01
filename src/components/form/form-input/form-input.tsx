import { useState } from 'react';

import { ReactComponent as EyeClosedIcon } from '../../../assets/images/icons/eye_closed.svg';
import { ReactComponent as EyeOpenedIcon } from '../../../assets/images/icons/eye_opened.svg';
import { ReactComponent as TickIcon } from '../../../assets/images/icons/tick.svg';

import styles from './form-input.module.scss';

interface FormInputOProps {
  placeholderText: string;
  error: boolean;
  type: 'text' | 'password' | 'number';
  hint?: string;
}

const FormInput: React.FC<FormInputOProps> = ({ placeholderText, hint, error, type }) => {
  console.log('Forminput');
  const [passVisible, setPassVisible] = useState(false);

  const togglePassVisibility = () => {
    setPassVisible(!passVisible);
  };

  const getInputType = () => {
    switch (type) {
      case 'number':
        return 'number';
      case 'password':
        if (!passVisible) {
          return 'password';
        }

        return 'text';

      default:
        return 'text';
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.input__wrapper}>
        <div className={styles.input__block}>
          <input type={getInputType()} className={styles.input} required={true} />
          <span className={styles.placeholder}>{placeholderText}</span>
        </div>

        {type === 'password' && (
          <div className={styles.icons}>
            <TickIcon />
            {passVisible ? (
              <EyeOpenedIcon onClick={togglePassVisibility} />
            ) : (
              <EyeClosedIcon onClick={togglePassVisibility} />
            )}
          </div>
        )}
      </div>
      <span className={styles.hint}>{hint}</span>
    </div>
  );
};

export { FormInput };
