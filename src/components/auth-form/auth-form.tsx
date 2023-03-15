import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  hideLoader,
  resetUserState,
  selectLoaderVisibility,
  selectUserState,
  showLoader,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import { auth } from '../../store/actions';
import { AuthFormData } from '../../types/types';
import { Button } from '../button';
import { Form, FormInput, FormLinkBlock, FormTitle } from '../form';
import { ResultAuthBlock } from '../result-auth-block';

import styles from './auth-form.module.scss';

const schema = yup.object<AuthFormData>({
  identifier: yup.string().required('Поле не может быть пустым'),
  password: yup.string().required('Поле не может быть пустым'),
});

const AuthForm = () => {
  const dispatch = useAppDispatch();
  const { error: authError, loading } = useAppSelector(selectUserState);
  const isLoaderVisible = useAppSelector(selectLoaderVisibility);
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors, dirtyFields, isDirty },
  } = useForm<AuthFormData>({
    mode: 'all',
    resolver: yupResolver(schema),
    criteriaMode: 'all',
  });

  useEffect(() => {
    if (loading && !isLoaderVisible) {
      dispatch(showLoader());
    }
    if (!loading && isLoaderVisible) {
      dispatch(hideLoader());
    }
  }, [dispatch, isLoaderVisible, loading]);

  const onSubmit = handleSubmit((data) => {
    dispatch(auth(data));
  });

  if (authError && authError !== 400) {
    return (
      <ResultAuthBlock
        title='Вход не выполнен'
        text='Что-то пошло не так. Попробуйте ещё раз'
        buttonText='ПОВТОРИТЬ'
        onClick={() => {
          dispatch(resetUserState());
          dispatch(auth(getValues()));
        }}
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      <Form onSubmit={onSubmit} testId='auth-form'>
        <FormTitle title='Вхoд в личный кабинет' />
        <div>
          <FormInput
            {...register('identifier')}
            error={Boolean(errors.identifier || authError === 400)}
            errorMessageRequired={errors.identifier?.type === 'required' ? errors.identifier?.message : undefined}
            placeholderText='Логин'
            type='text'
            onBlurHandler={() => trigger('identifier')}
          />
          <FormInput
            {...register('password')}
            error={Boolean(errors.password || authError === 400)}
            errorMessageRequired={errors.password?.type === 'required' ? errors.password?.message : undefined}
            isDirty={dirtyFields.password}
            placeholderText='Пароль'
            type='password'
            showTick={false}
            onBlurHandler={() => trigger('password')}
          />
          <div className={styles.forgot}>
            {authError === 400 && (
              <span className={styles.error} data-test-id='hint'>
                Неверный логин или пароль!
              </span>
            )}
            <Link to='/forgot-pass'>
              {authError === 400 ? (
                <span className={styles.dark}>Восстановить?</span>
              ) : (
                <span className={styles.gray}>Забыли логин или пароль?</span>
              )}
            </Link>
          </div>
        </div>
        <div className={styles.footer}>
          <Button
            contained={!isDirty || !Object.keys(errors).length}
            onClick={() => {}}
            className={styles.button}
            type='submit'
            disabled={Boolean(Object.keys(errors).length)}
          >
            ВХОД
          </Button>
          <FormLinkBlock text='Нет учётной записи?' linkText='РЕГИСТРАЦИЯ' to='/registration' />
        </div>
      </Form>
    </div>
  );
};

export { AuthForm };
