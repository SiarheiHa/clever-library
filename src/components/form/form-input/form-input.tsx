import React, { useState } from 'react';
import { Control, Controller, UseFormRegister } from 'react-hook-form';
import MaskedInput from 'react-text-mask';
import classNames from 'classnames';

import { ReactComponent as EyeClosedIcon } from '../../../assets/images/icons/eye_closed.svg';
import { ReactComponent as EyeOpenedIcon } from '../../../assets/images/icons/eye_opened.svg';
import { ReactComponent as TickIcon } from '../../../assets/images/icons/tick.svg';
import { AuthFormData, RegistrationFormData, ResetPassFormData } from '../../../types/types';

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
  control?: Control<RegistrationFormData | AuthFormData | ResetPassFormData>;
  showTick?: boolean;
}

const mask = ['+', '3', '7', '5', ' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

const FormInput = React.forwardRef<
  HTMLInputElement,
  FormInputOProps & ReturnType<UseFormRegister<RegistrationFormData | AuthFormData | ResetPassFormData>>
>(
  (
    {
      control,
      placeholderText,
      hint,
      error,
      errorMessageRequired,
      errorsMatches,
      isDirty,
      showTick,
      type,
      name,
      ...rest
    },
    ref
  ) => {
    const [passVisible, setPassVisible] = useState(false);
    const [isFocus, setIsFocus] = useState(false);

    // console.log(error);
    // console.log(errorMessageRequired);

    const togglePassVisibility = () => {
      setPassVisible(!passVisible);
    };

    const getInputType = () => {
      switch (type) {
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
            {type === 'number' && control ? (
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <MaskedInput
                    mask={mask}
                    // name={name}
                    type={getInputType()}
                    className={styles.input}
                    required={true}
                    // {...rest}
                    onFocus={onFocus}
                    // onBlur={onBlur}
                    guide={true}
                    keepCharPositions={true}
                    placeholderChar={'\u0078'}
                    showMask={false}
                    {...field}
                  />
                )}
              />
            ) : (
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
            )}
            <span className={styles.placeholder}>{placeholderText}</span>
          </div>

          {type === 'password' && (
            <div className={styles.icons}>
              {error || !isDirty || !showTick ? null : <TickIcon />}
              {isDirty &&
                (passVisible ? (
                  <EyeOpenedIcon onClick={togglePassVisibility} />
                ) : (
                  <EyeClosedIcon onClick={togglePassVisibility} />
                ))}
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
  }
);

export { FormInput };
