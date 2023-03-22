import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ReactComponent as ArrowIcon } from '../../../assets/images/icons/arrow-left.svg';
import { regexp } from '../../../constants';
import {
  hideLoader,
  requestRefreshLink,
  selectLoaderVisibility,
  showLoader,
  useAppDispatch,
  useAppSelector,
} from '../../../store';
import { selectForgotPassState } from '../../../store/forgot-pass-slice';
import { EmailFormData } from '../../../types/types';
import { Button } from '../../button';
import { Form, FormInput, FormLinkBlock, FormTitle } from '../../form';
import { ResultAuthBlock } from '../../result-auth-block';

import styles from './email-form.module.scss';

const schema = yup.object<EmailFormData>({
  email: yup.string().required('Поле не может быть пустым').matches(regexp.email, 'Введите корректный e-mail'),
});

const EmailForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, success, errorMessage } = useAppSelector(selectForgotPassState);
  const isLoaderVisible = useAppSelector(selectLoaderVisibility);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isDirty },
  } = useForm<EmailFormData>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    criteriaMode: 'all',
  });

  useEffect(() => {
    console.log('useeffect');
    console.log(loading && !isLoaderVisible);
    if (loading) {
      console.log('AAAAAAAAAAAAAAAAA');
      dispatch(showLoader());
    }
    if (!loading && isLoaderVisible) {
      dispatch(hideLoader());
    }
  }, [dispatch, isLoaderVisible, loading]);

  const onSubmit = handleSubmit((data) => {
    dispatch(requestRefreshLink(data));
  });

  if (success) {
    return (
      <ResultAuthBlock
        title='Письмо выслано'
        text='Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля'
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Button onClick={() => navigate('/auth')} bordered={false} shadowed={false}>
          <ArrowIcon />
        </Button>
        <span className={styles.text}>ВХОД В ЛИЧНЫЙ КАБИНЕТ</span>
      </div>

      <Form onSubmit={onSubmit} className={styles.form} testId='send-email-form'>
        <FormTitle title='Восстановление пароля' />
        <div>
          <FormInput
            {...register('email')}
            error={Boolean(errors.email || errorMessage)}
            errorMessageRequired={errors.email?.message || errorMessage || undefined}
            placeholderText='Email'
            type='text'
            onBlurHandler={() => trigger('email')}
          />
          <span className={styles.gray}>
            На это email будет отправлено письмо с инструкциями по восстановлению пароля
          </span>
        </div>
        <div className={styles.footer}>
          <Button
            contained={!isDirty || !Object.keys(errors).length}
            onClick={() => {}}
            className={styles.button}
            type='submit'
            disabled={Boolean(Object.keys(errors).length)}
          >
            ВОССТАНОВИТЬ
          </Button>
          <FormLinkBlock text='Нет учётной записи?' linkText='РЕГИСТРАЦИЯ' to='/registration' />
        </div>
      </Form>
    </div>
  );
};

export { EmailForm };
