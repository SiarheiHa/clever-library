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
  isDirty?: boolean;
  type: 'text' | 'password' | 'number';
  hint?: string;
}

const FormInput = React.forwardRef<
  HTMLInputElement,
  FormInputOProps & ReturnType<UseFormRegister<RegistrationFormData>>
>(({ placeholderText, hint, error, errorMessageRequired, errorsMatches, isDirty, type, name, ...rest }, ref) => {
  const [passVisible, setPassVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

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

  const onFocus = () => {
    setIsFocus(true);
  };

  const onBlur = () => {
    setIsFocus(false);
  };

  const wrapperClasses = classNames(styles.input__wrapper, error && styles.error);

  return (
    <div className={styles.wrapper}>
      <div className={wrapperClasses}>
        <div className={styles.input__block}>
          <input
            name={name}
            type={getInputType()}
            className={styles.input}
            required={true}
            {...rest}
            ref={ref}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <span className={styles.placeholder}>{placeholderText}</span>
        </div>

        {type === 'password' && (
          <div className={styles.icons}>
            {error || !isDirty ? null : <TickIcon />}
            {passVisible ? (
              <EyeOpenedIcon onClick={togglePassVisibility} />
            ) : (
              <EyeClosedIcon onClick={togglePassVisibility} />
            )}
          </div>
        )}
      </div>
      <Hint
        hint={hint}
        error={error}
        errorMessageRequired={errorMessageRequired}
        errorsMatches={errorsMatches}
        isInputFocused={isFocus}
      />
    </div>
  );
});

export { FormInput };
