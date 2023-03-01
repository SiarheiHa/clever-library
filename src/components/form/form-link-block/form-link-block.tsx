import { Link } from 'react-router-dom';

import { ReactComponent as ArrowIcon } from '../../../assets/images/icons/arrow-right.svg';

import styles from './form-link-block.module.scss';

interface FormLinkBlockProps {
  text: string;
  linkText: string;
  to: string;
}

const FormLinkBlock = ({ to, linkText, text }: FormLinkBlockProps) => (
  <div className={styles.wrapper}>
    <span className={styles.text}>{text}</span>
    <Link className={styles.link} to={to}>
      <span>{linkText}</span>
      <ArrowIcon />
    </Link>
  </div>
);

export { FormLinkBlock };
