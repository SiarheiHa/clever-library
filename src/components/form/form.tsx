import styles from './form.module.scss';

interface FormProps {
  children: React.ReactNode;
  // onClick: () => void;
  // className?: string;
}

const Form: React.FC<FormProps> = ({ children }) => {
  console.log('form');

  return <form className={styles.form}>{children}</form>;
};

export { Form };
