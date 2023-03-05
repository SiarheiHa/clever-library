import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import classNames from 'classnames';

import { ReactComponent as EyeClosedIcon } from '../../../assets/images/icons/eye_closed.svg';
import { ReactComponent as EyeOpenedIcon } from '../../../assets/images/icons/eye_opened.svg';
import { ReactComponent as TickIcon } from '../../../assets/images/icons/tick.svg';
import { RegistrationFormData } from '../../../types/types';

import { Hint } from './hint';

import styles from './form-input.module.scss';

interface FormInputOProps {
  placeholderText: string;
  errorMessageRequired?: string;
  errorsMatches?: string | string[];
  error: boolean;
  type: 'text' | 'password' | 'number';
  hint?: string;
}

const FormInput = React.forwardRef<
  HTMLInputElement,
  FormInputOProps & ReturnType<UseFormRegister<RegistrationFormData>>
>(({ placeholderText, hint, error, errorMessageRequired, errorsMatches, type, name, ...rest }, ref) => {
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

  const wrapperClasses = classNames(styles.input__wrapper, error && styles.error);

  return (
    <div className={styles.wrapper}>
      <div className={wrapperClasses}>
        <div className={styles.input__block}>
          <input name={name} type={getInputType()} className={styles.input} required={true} {...rest} ref={ref} />
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
      <Hint hint={hint} error={error} errorMessageRequired={errorMessageRequired} errorsMatches={errorsMatches} />
      {/* <span className={styles.hint}>{hint}</span> */}
    </div>
  );
});

export { FormInput };
