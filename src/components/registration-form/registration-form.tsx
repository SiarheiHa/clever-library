import React, { useEffect, useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { regexp } from '../../constants';
import {
  hideLoader,
  registerUser,
  resetRegistrationState,
  selectLoaderVisibility,
  selectRegistration,
  showLoader,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import { AuthFormData, RegistrationFormData, ResetPassFormData } from '../../types/types';
import { Button } from '../button';
import { Form, FormInput, FormLinkBlock, FormTitle } from '../form';
import { ResultAuthBlock } from '../result-auth-block';

import styles from './registration-form.module.scss';

const schema1 = yup.object<RegistrationFormData>({
  username: yup
    .string()
    .required('Поле не может быть пустым')
    .matches(regexp.digit, 'цифры')
    .matches(regexp.latinLetter, 'латинский алфавит'),
  password: yup
    .string()
    .required('Поле не может быть пустым')
    .min(8, 'не менее 8 символов')
    .matches(regexp.digit, 'цифрой')
    .matches(regexp.bigLetter, 'заглавной буквой'),
});

const schema2 = yup.object<RegistrationFormData>({
  firstName: yup.string().required('Поле не может быть пустым'),
  lastName: yup.string().required('Поле не может быть пустым'),
});

const schema3 = yup.object<RegistrationFormData>({
  phone: yup.string().required('Поле не может быть пустым').matches(regexp.phoneBY, 'В формате +375 (xx) xxx-xx-xx'),
  email: yup.string().required('Поле не может быть пустым').matches(regexp.email, 'Введите корректный e-mail'),
});

const schemes = [schema1, schema2, schema3];
const buttonText = ['СЛЕДУЮЩИЙ ШАГ', 'ПОСЛЕДНИЙ ШАГ', 'ЗАРЕГИСТРИРОВАТЬСЯ'];

const RegistrationForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error: registrationError, loading, success } = useAppSelector(selectRegistration);
  const isLoaderVisible = useAppSelector(selectLoaderVisibility);
  const [step, setStep] = useState<number>(1);
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors, dirtyFields, isDirty },
    reset,
    trigger,
  } = useForm<RegistrationFormData>({
    mode: 'all',
    shouldFocusError: false,
    resolver: yupResolver(schemes[step - 1]),
    criteriaMode: 'all',
  });

  useEffect(() => {
    if (loading && !isLoaderVisible) {
      dispatch(showLoader());
    }
    if (!loading && isLoaderVisible) {
      // console.log(14);
      dispatch(hideLoader());
    }
  }, [dispatch, isLoaderVisible, loading]);

  const onSubmit = handleSubmit((data) => {
    if (step < 3) {
      setStep(step + 1);
    } else if (step === 3) {
      dispatch(registerUser(data));
    }
  });

  const usernameErrorMatches: string | string[] | undefined =
    typeof errors.username?.types?.matches === 'boolean' ? undefined : errors.username?.types?.matches;

  const getPassErrors = () => {
    let errorsArr: string[] = [];

    if (typeof errors.password?.types?.matches === 'string') {
      errorsArr.push(errors.password.types.matches);
    }

    if (Array.isArray(errors.password?.types?.matches)) {
      errorsArr = [...(errors.password?.types?.matches as string[])];
    }

    if (typeof errors.password?.types?.min === 'string') {
      errorsArr.push(errors.password.types.min);
    }

    return errorsArr.length ? errorsArr : undefined;
  };

  if (registrationError) {
    if (registrationError === 400) {
      return (
        <ResultAuthBlock
          title='Данные не сохранились'
          text='Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.'
          buttonText='НАЗАД К РЕГИСТРАЦИИ'
          onClick={() => {
            dispatch(resetRegistrationState());
            reset();
            setStep(1);
          }}
        />
      );
    }

    return (
      <ResultAuthBlock
        title='Данные не сохранились'
        text='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз'
        buttonText='ПОВТОРИТЬ'
        onClick={() => dispatch(registerUser(getValues()))}
      />
    );
  }

  if (success) {
    return (
      <ResultAuthBlock
        title='Регистрация успешна'
        text='Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль'
        buttonText='ВХОД'
        onClick={() => navigate('/')}
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      <Form onSubmit={onSubmit} testId='register-form'>
        <FormTitle title='Регистрация' subtitle={`${step} шаг из 3`} />
        <div>
          {step === 1 && (
            <React.Fragment>
              <FormInput
                {...register('username')}
                error={Boolean(errors.username)}
                errorMessageRequired={errors.username?.type === 'required' ? errors.username?.message : undefined}
                errorsMatches={usernameErrorMatches}
                hint='Используйте для логина латинский алфавит и цифры'
                placeholderText='Придумайте логин для входа'
                type='text'
                onBlurHandler={() => trigger('username')}
              />
              <FormInput
                {...register('password')}
                error={Boolean(errors.password)}
                errorMessageRequired={errors.password?.type === 'required' ? errors.password?.message : undefined}
                errorsMatches={getPassErrors()}
                isDirty={dirtyFields.password}
                hint='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                placeholderText='Пароль'
                type='password'
                showTick={true}
                onBlurHandler={() => trigger('password')}
              />
            </React.Fragment>
          )}
          {step === 2 && (
            <React.Fragment>
              <FormInput
                {...register('firstName')}
                error={Boolean(errors.firstName)}
                errorMessageRequired={errors.firstName?.type === 'required' ? errors.firstName?.message : undefined}
                placeholderText='Имя'
                type='text'
                onBlurHandler={() => trigger('firstName')}
              />
              <FormInput
                {...register('lastName')}
                error={Boolean(errors.lastName)}
                errorMessageRequired={errors.lastName?.type === 'required' ? errors.lastName?.message : undefined}
                placeholderText='Фамилия'
                type='text'
                onBlurHandler={() => trigger('lastName')}
              />
            </React.Fragment>
          )}
          {step === 3 && (
            <React.Fragment>
              <FormInput
                {...register('phone')}
                error={Boolean(errors.phone)}
                errorMessageRequired={errors.phone?.message}
                placeholderText='Номер телефона'
                hint='В формате +375 (xx) xxx-xx-xx'
                type='number'
                control={control as Control<AuthFormData | RegistrationFormData | ResetPassFormData>}
                onBlurHandler={() => trigger('phone')}
              />
              <FormInput
                {...register('email')}
                error={Boolean(errors.email)}
                errorMessageRequired={errors.email?.message}
                errorsMatches={errors.email?.type === 'email' ? errors.email?.message : undefined}
                placeholderText='E-mail'
                type='text'
                onBlurHandler={() => trigger('email')}
              />
            </React.Fragment>
          )}
        </div>
        <div className={styles.footer}>
          <Button
            contained={!isDirty || !Object.keys(errors).length}
            onClick={() => {}}
            className={styles.button}
            type='submit'
            disabled={Boolean(Object.keys(errors).length)}
          >
            {buttonText[step - 1]}
          </Button>
          <FormLinkBlock text='Есть учётная запись?' linkText='ВОЙТИ' to='/auth' />
        </div>
      </Form>
    </div>
  );
};

export { RegistrationForm };
