import { Button } from '../button';
import { Form, FormInput, FormLinkBlock, FormTitle } from '../form';

import styles from './registration-form.module.scss';

const RegistrationForm = () => {
  console.log('RegistrationForm');

  return (
    <Form>
      <FormTitle title='Регистрация' subtitle='1 шаг из 3' />
      <div>
        <FormInput
          error={false}
          hint='Используйте для логина латинский алфавит и цифры'
          placeholderText='Придумайте логин для входа'
          type='text'
        />
        <FormInput
          error={false}
          hint='Пароль не менее 8 символов, с заглавной буквой и цифрой'
          placeholderText='Пароль'
          type='password'
        />
      </div>
      <div className={styles.footer}>
        <Button contained={true} onClick={() => {}} className={styles.button}>
          СЛЕДУЮЩИЙ ШАГ
        </Button>
        <FormLinkBlock text='Есть учётная запись?' linkText='ВОЙТИ' to='/auth' />
      </div>
    </Form>
  );
};

export { RegistrationForm };
