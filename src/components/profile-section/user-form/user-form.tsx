import { useEffect, useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import * as yup from 'yup';

import { useUpdateUserMutation } from '../../../api/current-user-api';
import { regexp } from '../../../constants';
import { showToast, useAppDispatch } from '../../../store';
import {
  AuthFormData,
  RegistrationFormData,
  ResetPassFormData,
  UserDetail,
  UserFormFields,
} from '../../../types/types';
import { Button } from '../../button';
import { Form, FormInput } from '../../form';

import styles from './user-form.module.scss';

const schema = yup.object<UserFormFields>({
  login: yup
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
  const [updateUser, { isLoading: isUserUpdating, isError: isUserUpdatingError, isSuccess, reset: resetQueryState }] =
    useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors, dirtyFields },
    trigger,
  } = useForm<UserFormFields>({
    mode: 'all',
    shouldFocusError: false,
    resolver: yupResolver(schema),
    criteriaMode: 'all',
    defaultValues: {
      email,
      firstName,
      lastName,
      phone,
      login: username,
      password: 'TrataTa3raza',
    },
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess && !isUserUpdating) {
      resetQueryState();
      dispatch(showToast({ mode: 'success', message: 'Изменения успешно сохранены!' }));
    } else if (isUserUpdatingError) {
      resetQueryState();
      dispatch(showToast({ mode: 'warning', message: 'Изменения не были сохранены. Попробуйте позже!' }));
    }
  }, [dispatch, isSuccess, isUserUpdating, isUserUpdatingError, resetQueryState]);

  const handleEdit = () => {
    setEditMode(!isEditMode);
  };

  const onSubmit = handleSubmit((data) => {
    updateUser({ id: String(id), data: { ...data, username: data.login } });
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
    typeof errors.login?.types?.matches === 'boolean' ? undefined : errors.login?.types?.matches;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>Учётные данные</h3>
        <h4 className={styles.subtitle}>Здесь вы можете отредактировать информацию о себе</h4>
      </div>
      <Form onSubmit={onSubmit} className={styles.form} id='user-form' testId='profile-form'>
        <div className={styles.inputs}>
          <FormInput
            {...register('login')}
            error={Boolean(errors.login)}
            errorMessageRequired={errors.login?.type === 'required' ? errors.login?.message : undefined}
            errorsMatches={usernameErrorMatches}
            hint='Используйте для логина латинский алфавит и цифры'
            placeholderText='Введите ваш email'
            type='text'
            onBlurHandler={() => {
              // console.log(errors);
              // console.log(getValues());
              trigger('login');
            }}
            value={username}
            readonly={!isEditMode}
            disabled={!isEditMode}
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
            disabled={!isEditMode}
          />

          <FormInput
            {...register('phone')}
            error={Boolean(errors.phone)}
            errorMessageRequired={errors.phone?.message}
            placeholderText='Номер телефона'
            hint='В формате +375 (xx) xxx-xx-xx'
            type='number'
            control={control as Control<AuthFormData | RegistrationFormData | ResetPassFormData | UserFormFields>}
            onBlurHandler={() => trigger('phone')}
            value={phone}
            readonly={!isEditMode}
            disabled={!isEditMode}
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
            disabled={!isEditMode}
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
            disabled={!isEditMode}
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
            disabled={!isEditMode}
          />
        </div>
      </Form>
      <div className={styles.buttons}>
        <Button onClick={handleEdit} className={styles.button} shadowed={false} testId='edit-button'>
          Редактировать
        </Button>
        <Button
          form='user-form'
          type='submit'
          onClick={() => {}}
          className={classNames(styles.button, !isEditMode && styles.button_grey)}
          shadowed={false}
          filtered={true}
          bordered={false}
          disabled={!isEditMode}
          contained={isEditMode}
          testId='save-button'
        >
          СОХРАНИТЬ ИЗМЕНЕНИЯ
        </Button>
      </div>
    </div>
  );
};

export { UserForm };
