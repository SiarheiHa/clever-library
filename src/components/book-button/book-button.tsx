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
  const { booked, endDate } = book;

  const getButtonText = () => {
    if (booked && endDate) {
      return `ЗАНЯТА ДО ${endDate}`;
    }
    if (booked) {
      return 'ЗАБРОНИРОВАНА';
    }

    return 'ЗАБРОНИРОВАТЬ';
  };

  const getButtonProps = () => {
    if (booked && endDate) {
      return {
        bordered: true,
        disabled: true,
        className: classNames(styles.busy, className),
      };
    }
    if (booked) {
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
