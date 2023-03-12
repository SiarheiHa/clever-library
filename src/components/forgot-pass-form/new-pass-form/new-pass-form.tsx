import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  hideLoader,
  resetPass,
  resetPassState,
  selectLoaderVisibility,
  selectPassState,
  showLoader,
  useAppDispatch,
  useAppSelector,
} from '../../../store';
import { ResetPassFormData } from '../../../types/types';
import { Button } from '../../button';
import { Form, FormInput, FormLinkBlock, FormTitle } from '../../form';
import { ResultAuthBlock } from '../../result-auth-block';

import styles from './new-pass-form.module.scss';

const schema = yup.object<ResetPassFormData>({
  password: yup
    .string()
    .required('Поле не может быть пустым')
    .min(8, 'не менее 8 символов')
    .matches(/[0-9]/, 'цифрой')
    .matches(/[A-ZА-Я]/, 'заглавной буквой'),
  passwordConfirmation: yup
    .string()
    .required('Поле не может быть пустым')
    .oneOf([yup.ref('password')], 'Пароли не совпадают'),
});

const NewPassForm = ({ code }: { code: string }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error: resetError, loading, success } = useAppSelector(selectPassState);
  const isLoaderVisible = useAppSelector(selectLoaderVisibility);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, dirtyFields, isValid, isDirty },
  } = useForm<ResetPassFormData>({
    mode: 'all',
    // shouldFocusError: false,
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
    dispatch(resetPass({ ...data, code }));
  });

  const onChange = () => {
    // console.log(errors);
  };

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

  if (resetError) {
    return (
      <ResultAuthBlock
        title='Данные не сохранились'
        text='Что-то пошло не так. Попробуйте ещё раз'
        buttonText='ПОВТОРИТЬ'
        onClick={() => {
          dispatch(resetPass({ ...getValues(), code }));
        }}
      />
    );
  }

  if (success) {
    return (
      <ResultAuthBlock
        title='Новые данные сохранены'
        text='Зайдите в личный кабинет, используя свои логин и новый пароль'
        buttonText='ВХОД'
        onClick={() => {
          dispatch(resetPassState());
          navigate('/auth');
        }}
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <FormTitle title='Восстановление пароля' />
        <div>
          <FormInput
            {...register('password')}
            error={Boolean(errors.password)}
            errorMessageRequired={errors.password?.type === 'required' ? errors.password?.message : undefined}
            errorsMatches={getPassErrors()}
            isDirty={dirtyFields.password}
            hint='Пароль не менее 8 символов, с заглавной буквой и цифрой'
            placeholderText='Новый пароль'
            type='password'
            showTick={true}
          />
          <FormInput
            {...register('passwordConfirmation')}
            error={Boolean(errors.passwordConfirmation)}
            errorMessageRequired={errors.passwordConfirmation?.message}
            isDirty={dirtyFields.passwordConfirmation}
            placeholderText='Повторите пароль'
            type='password'
          />
        </div>
        <div className={styles.footer}>
          <Button
            contained={!isDirty || !Object.keys(errors).length}
            onClick={() => {}}
            className={styles.button}
            type='submit'
            disabled={Boolean(Object.keys(errors).length)}
          >
            СОХРАНИТЬ ИЗМЕНЕНИЯ
          </Button>
          <FormLinkBlock text='После сохранения войдите в библиотеку, используя новый пароль' />
        </div>
      </Form>
    </div>
  );
};

export { NewPassForm };
