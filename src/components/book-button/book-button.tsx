import React from 'react';
import classNames from 'classnames';

import { Book } from '../../types/types';
import { Button } from '../button';

import styles from './book-card.module.scss';

interface BookCardProps {
  book: Book;
  onClick: () => void;
  className?: string;
  testId?: string;
}

const BookButton: React.FC<BookCardProps> = ({ book, className, ...restProps }) => {
  const { delivery, booking } = book;

  const getButtonText = () => {
    if (delivery?.handed) {
      const date = new Date(delivery.dateHandedTo);
      const endDate = `${date.getDay() + 1}.${date.getMonth() + 1}`;

      return `ЗАНЯТА ДО ${endDate}`;
    }
    if (booking?.order) {
      return 'ЗАБРОНИРОВАНА';
    }

    return 'ЗАБРОНИРОВАТЬ';
  };

  const getButtonProps = () => {
    if (delivery?.handed) {
      return {
        bordered: true,
        disabled: true,
        className: classNames(styles.busy, className),
      };
    }
    if (booking?.order) {
      return {
        bordered: true,
        disabled: true,
        className: classNames(className),
      };
    }

    return {
      contained: true,
      bordered: false,
      className: classNames(className),
    };
  };

  return (
    <Button shadowed={false} {...getButtonProps()} {...restProps}>
      {getButtonText()}
    </Button>
  );
};

export { BookButton };
