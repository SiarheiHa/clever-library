import classNames from 'classnames';

import styles from './form-title.module.scss';

const FormTitle = ({ title, subtitle, className }: { title: string; subtitle?: string; className?: string }) => (
  <div className={classNames(className)}>
    <h3 className={styles.title}>{title}</h3>
    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
  </div>
);

export { FormTitle };
