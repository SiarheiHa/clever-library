import { useEffect, useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useGetCurrentUserQuery } from '../../../api/current-user-api';
import { regexp } from '../../../constants';
import { hideLoader, selectLoaderVisibility, showLoader, useAppDispatch, useAppSelector } from '../../../store';
import { AuthFormData, RegistrationFormData, ResetPassFormData, UserDetail } from '../../../types/types';
import { getURI } from '../../../utils';
import { Button } from '../../button';
import { Form, FormInput } from '../../form';

import styles from './user-form.module.scss';

const schema = yup.object<RegistrationFormData>({
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
  firstName: yup.string(),
  lastName: yup.string(),
  phone: yup.string().matches(regexp.phoneBY, 'В формате +375 (xx) xxx-xx-xx'),
  email: yup.string().required('Поле не может быть пустым').matches(regexp.email, 'Введите корректный e-mail'),
});

const UserForm: React.FC<Pick<UserDetail, 'email' | 'firstName' | 'lastName' | 'id' | 'phone' | 'username'>> = ({
  email,
  firstName,
  id,
  lastName,
  phone,
  username,
}) => {
  const [isEditMode, setEditMode] = useState(false);
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
    resolver: yupResolver(schema),
    criteriaMode: 'all',
  });
  const isLoaderVisible = useAppSelector(selectLoaderVisibility);
  const dispatch = useAppDispatch();

  const handleEdit = () => {
    setEditMode(!isEditMode);
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);

    // dispatch(updateUser(data));
  });

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

  const usernameErrorMatches: string | string[] | undefined =
    typeof errors.username?.types?.matches === 'boolean' ? undefined : errors.username?.types?.matches;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>Учётные данные</h3>
        <h4 className={styles.subtitle}>Здесь вы можете отредактировать информацию о себе</h4>
      </div>
      <Form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.inputs}>
          <FormInput
            {...register('username')}
            error={Boolean(errors.username)}
            errorMessageRequired={errors.username?.type === 'required' ? errors.username?.message : undefined}
            errorsMatches={usernameErrorMatches}
            hint='Используйте для логина латинский алфавит и цифры'
            placeholderText='Придумайте логин для входа'
            type='text'
            onBlurHandler={() => trigger('username')}
            value={username}
            readonly={!isEditMode}
          />

          <FormInput
            {...register('firstName')}
            error={Boolean(errors.firstName)}
            errorMessageRequired={errors.firstName?.type === 'required' ? errors.firstName?.message : undefined}
            placeholderText='Имя'
            type='text'
            onBlurHandler={() => trigger('firstName')}
            value={firstName}
            readonly={!isEditMode}
          />

          <FormInput
            {...register('phone')}
            error={Boolean(errors.phone)}
            errorMessageRequired={errors.phone?.message}
            placeholderText='Номер телефона'
            hint='В формате +375 (xx) xxx-xx-xx'
            type='number'
            control={control as Control<AuthFormData | RegistrationFormData | ResetPassFormData>}
            onBlurHandler={() => trigger('phone')}
            value={phone}
            readonly={!isEditMode}
          />
        </div>

        <div className={styles.inputs}>
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
            value='TrataTa3raza'
            readonly={!isEditMode}
          />

          <FormInput
            {...register('lastName')}
            error={Boolean(errors.lastName)}
            errorMessageRequired={errors.lastName?.type === 'required' ? errors.lastName?.message : undefined}
            placeholderText='Фамилия'
            type='text'
            onBlurHandler={() => trigger('lastName')}
            value={lastName}
            readonly={!isEditMode}
          />

          <FormInput
            {...register('email')}
            error={Boolean(errors.email)}
            errorMessageRequired={errors.email?.message}
            errorsMatches={errors.email?.type === 'email' ? errors.email?.message : undefined}
            placeholderText='E-mail'
            type='text'
            onBlurHandler={() => trigger('email')}
            value={email}
            readonly={!isEditMode}
          />
        </div>
      </Form>
      <div className={styles.buttons}>
        <Button onClick={handleEdit} className={styles.button} shadowed={false} contained={true}>
          РЕДАКТИРОВАТЬ
        </Button>
        <Button
          onClick={() => {}}
          className={styles.button}
          shadowed={false}
          disabled={true}
          contained={false}
          filtered={true}
        >
          СОХРАНИТЬ ИЗМЕНЕНИЯ
        </Button>
      </div>
    </div>
  );
};

export { UserForm };
