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
});

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
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
  };

  const loginErrorMatches: string | string[] | undefined =
    typeof errors.login?.types?.matches === 'boolean' ? undefined : errors.login?.types?.matches;

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
          {...register('password', { required: 'Поле не может быть пустым' })}
          error={Boolean(errors.password)}
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
