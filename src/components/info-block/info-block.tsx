import { useState } from 'react';
import classNames from 'classnames';

import сhevron from '../../assets/images/icons/сhevron.svg';
import { Button } from '../button';

import styles from './info-block.module.scss';

interface InfoBlockProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  badge?: string;
  dropdown?: boolean;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ title, className, children, badge, dropdown = false }) => {
  const [isOpen, setOpen] = useState(true);
  const toggleOpen = () => {
    setOpen(!isOpen);
  };

  const classes = classNames(styles.block, className);
  const buttonClasses = classNames(styles.button, { [styles.revert]: !isOpen });
  const childrenClasses = classNames(styles.children, { [styles.hide]: !isOpen });

  return (
    <div className={classes}>
      <div className={styles.main}>
        <p className={styles.title}>
          {title}
          {badge && <span className={styles.badge}>{badge}</span>}
        </p>
        {dropdown && (
          <Button
            onClick={toggleOpen}
            className={buttonClasses}
            shadowed={false}
            bordered={false}
            filtered={false}
            testId='button-hide-reviews'
          >
            <img src={сhevron} className={styles.icon} alt='close' />
          </Button>
        )}
      </div>
      {isOpen && <div className={styles.line} />}
      <div className={childrenClasses}>{children}</div>
    </div>
  );
};

export { InfoBlock };
