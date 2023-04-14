import classNames from 'classnames';

import styles from './form.module.scss';

interface FormProps {
  children: React.ReactNode;
  onSubmit: () => void;
  onChange?: () => void;
  className?: string;
  testId?: string;
  id?: string;
}

const Form: React.FC<FormProps> = ({ children, className, id, onChange, onSubmit, testId }) => (
  <form
    data-test-id={testId}
    onChange={onChange}
    onSubmit={onSubmit}
    className={classNames(styles.form, className)}
    noValidate={true}
    id={id}
  >
    {children}
  </form>
);

export { Form };
