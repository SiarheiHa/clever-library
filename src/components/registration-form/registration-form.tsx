import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { RegistrationFormData } from '../../types/types';
import { Button } from '../button';
import { Form, FormInput, FormLinkBlock, FormTitle } from '../form';

import styles from './registration-form.module.scss';

const schema1 = yup.object<RegistrationFormData>({
  username: yup
    .string()
    .required('Поле не может быть пустым')
    .matches(/[0-9]/, 'цифры')
    .matches(/[a-zA-Z]/, 'латинский алфавит'),
  password: yup
    .string()
    .required('Поле не может быть пустым')
    .min(8, 'не менее 8 символов')
    .matches(/[0-9]/, 'цифрой')
    .matches(/[A-ZА-Я]/, 'заглавной буквой'),
});

const schema2 = yup.object<RegistrationFormData>({
  firstName: yup.string().required('Поле не может быть пустым'),
  lastName: yup.string().required('Поле не может быть пустым'),
});

const schema3 = yup.object<RegistrationFormData>({
  phone: yup
    .string()
    .required('Поле не может быть пустым')
    .matches(
      /^\+?375((\s\(33\)\s\d{3}-\d{2}-\d{2})|(\s\(29\)\s\d{3}-\d{2}-\d{2})|(\s\(44\)\s\d{3}-\d{2}-\d{2})|(\s\(25\)\s\d{3}-\d{2}-\d{2}))\s*$/,
      'В формате +375 (xx) xxx-xx-xx'
    ),
  email: yup
    .string()
    .required('Поле не может быть пустым')
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Введите корректный e-mail'
    ),
});

const schemes = [schema1, schema2, schema3];
const buttonText = ['СЛЕДУЮЩИЙ ШАГ', 'ПОСЛЕДНИЙ ШАГ', 'ЗАРЕГИСТРИРОВАТЬСЯ'];

const RegistrationForm = () => {
  const [step, setStep] = useState<number>(1);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, dirtyFields, isValid, isDirty },
  } = useForm<RegistrationFormData>({
    mode: 'all',
    // shouldFocusError: false,
    resolver: yupResolver(schemes[step - 1]),
    criteriaMode: 'all',
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    if (step < 3) {
      setStep(step + 1);
    }
    // console.log(errors);
  });

  const onChange = () => {
    // console.log(errors);
  };

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

  return (
    <Form onSubmit={onSubmit} onChange={onChange}>
      <FormTitle title='Регистрация' subtitle={`${step} шаг из 3`} />
      <div>
        {step === 1 && (
          <React.Fragment>
            <FormInput
              {...register('username')}
              error={Boolean(errors.username)}
              errorMessageRequired={errors.username?.type === 'required' ? errors.username.message : undefined}
              errorsMatches={usernameErrorMatches}
              hint='Используйте для логина латинский алфавит и цифры'
              placeholderText='Придумайте логин для входа'
              type='text'
            />
            <FormInput
              {...register('password')}
              error={Boolean(errors.password)}
              errorMessageRequired={errors.password?.type === 'required' ? errors.password.message : undefined}
              errorsMatches={getPassErrors()}
              isDirty={dirtyFields.password}
              hint='Пароль не менее 8 символов, с заглавной буквой и цифрой'
              placeholderText='Пароль'
              type='password'
            />
          </React.Fragment>
        )}
        {step === 2 && (
          <React.Fragment>
            <FormInput
              {...register('firstName')}
              error={Boolean(errors.firstName)}
              errorMessageRequired={errors.firstName?.type === 'required' ? errors.firstName.message : undefined}
              placeholderText='Имя'
              type='text'
            />
            <FormInput
              {...register('lastName')}
              error={Boolean(errors.lastName)}
              errorMessageRequired={errors.lastName?.type === 'required' ? errors.lastName.message : undefined}
              placeholderText='Фамилия'
              type='text'
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
              control={control}
            />
            <FormInput
              {...register('email')}
              error={Boolean(errors.email)}
              errorMessageRequired={errors.email?.message}
              errorsMatches={errors.email?.type === 'email' ? errors.email?.message : undefined}
              placeholderText='E-mail'
              type='text'
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
  );
};

export { RegistrationForm };
