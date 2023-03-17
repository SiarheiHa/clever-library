import React from 'react';
import classNames from 'classnames';

import { selectUserState, useAppSelector } from '../../store';
import { Book, BookDetail } from '../../types/types';
import { Button } from '../button';

import styles from './book-card.module.scss';

interface BookCardProps {
  book: Book | BookDetail;
  onClick: (() => void) | ((e: React.MouseEvent) => void);
  className?: string;
  testId?: string;
}

const BookButton: React.FC<BookCardProps> = ({ book, className, ...restProps }) => {
  const { userInfo } = useAppSelector(selectUserState);
  const { delivery, booking } = book;
  const currentUserId = userInfo?.user?.id;

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
    if (booking?.customerId) {
      if (booking.customerId === currentUserId) {
        return {
          bordered: true,
          disabled: false,
          className: classNames(className),
        };
      }

      return {
        bordered: true,
        disabled: true,
        className: classNames(styles.busy, className),
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
