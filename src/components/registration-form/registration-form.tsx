import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { RegistrationFormData } from '../../types/types';
import { Button } from '../button';
import { Form, FormInput, FormLinkBlock, FormTitle } from '../form';

import styles from './registration-form.module.scss';

const schema = yup.object<RegistrationFormData>({
  login: yup
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

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,

    formState: { errors, touchedFields, dirtyFields },
  } = useForm<RegistrationFormData>({
    mode: 'onChange',
    // shouldFocusError: false,
    resolver: yupResolver(schema),
    criteriaMode: 'all',
  });

  const onSubmit = handleSubmit((data) => {
    // console.log(data);
    // console.log(errors);
  });

  const onChange = () => {
    // console.log(errors);
    console.log(dirtyFields.login);
  };

  const loginErrorMatches: string | string[] | undefined =
    typeof errors.login?.types?.matches === 'boolean' ? undefined : errors.login?.types?.matches;

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
      <FormTitle title='Регистрация' subtitle='1 шаг из 3' />
      <div>
        <FormInput
          {...register('login')}
          error={Boolean(errors.login)}
          errorMessageRequired={errors.login?.type === 'required' ? errors.login.message : undefined}
          errorsMatches={loginErrorMatches}
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
      </div>
      <div className={styles.footer}>
        <Button contained={true} onClick={() => {}} className={styles.button} type='submit'>
          СЛЕДУЮЩИЙ ШАГ
        </Button>
        <FormLinkBlock text='Есть учётная запись?' linkText='ВОЙТИ' to='/auth' />
      </div>
    </Form>
  );
};

export { RegistrationForm };
