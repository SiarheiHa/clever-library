import React from 'react';
import classNames from 'classnames';

import styles from './button.module.scss';

interface ButtonProps {
  onClick: (() => void) | ((e: React.MouseEvent) => void);
  children: React.ReactNode;
  contained?: boolean;
  rounded?: boolean;
  bordered?: boolean;
  shadowed?: boolean;
  disabled?: boolean;
  filtered?: boolean;
  className?: string;
  type?: 'submit' | 'reset';
  testId?: string;
  form?: string;
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
  type,
  testId,
  form,
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
    <button
      // eslint-disable-next-line react/button-has-type
      type={type ? type : 'button'}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      data-test-id={testId}
      form={form}
    >
      {children}
    </button>
  );
};

export { Button };
