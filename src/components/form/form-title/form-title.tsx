import styles from './form-title.module.scss';

const FormTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div>
    <h3 className={styles.title}>{title}</h3>
    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
  </div>
);

export { FormTitle };
