import React from 'react';
import classNames from 'classnames';

import styles from './button.module.scss';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  contained?: boolean;
  rounded?: boolean;
  bordered?: boolean;
  shadowed?: boolean;
  disabled?: boolean;
  filtered?: boolean;
  className?: string;
  testId?: string;
}

const Button: React.FC<ButtonProps> = ({
  contained = false,
  rounded = false,
  bordered = true,
  shadowed = true,
  disabled = false,
  filtered = true,
  onClick,
  children,
  className,
  testId,
}) => {
  const classes = classNames(
    styles.button,
    bordered && styles.bordered,
    contained && styles.contained,
    rounded && styles.rounded,
    shadowed && styles.shadowed,
    disabled && styles.disabled,
    filtered && styles.filtered,
    className
  );

  return (
    <button type='button' className={classes} onClick={onClick} disabled={disabled} data-test-id={testId}>
      {children}
    </button>
  );
};

export { Button };
