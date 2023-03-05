import styles from './form.module.scss';

interface FormProps {
  children: React.ReactNode;
  onSubmit: () => void;
  onChange: () => void;
}

const Form: React.FC<FormProps> = ({ children, onChange, onSubmit }) => (
  <form onChange={onChange} onSubmit={onSubmit} className={styles.form} noValidate={true}>
    {children}
  </form>
);

export { Form };
