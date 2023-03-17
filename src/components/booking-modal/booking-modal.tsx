import React, { useEffect, useState } from 'react';

import { BookDetail } from '../../types/types';
import { formatDate } from '../../utils/date';
import { Button } from '../button';
import { Calendar } from '../calendar/calendar';
import { Modal } from '../modal';

import styles from './booking-modal.module.scss';

interface ReviewModalProps {
  book: BookDetail;
  isOpen: boolean;
  onClose: () => void;
  userId: number;
}

const BookingModal = ({ book, isOpen, onClose, userId }: ReviewModalProps) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const sendBooking = () => {
    console.log(selectedDate);
  };

  return (
    <Modal title='Выбор даты бронирования' isOpen={isOpen} onCancel={onClose}>
      <React.Fragment>
        <div className='date__container'>{selectedDate && formatDate(selectedDate, 'DDD DD MMM YYYY')}</div>
        <Calendar selectedDate={selectedDate} selectDate={(date) => setSelectedDate(date)} />
        <Button
          onClick={sendBooking}
          className={styles.button}
          contained={Boolean(selectedDate)}
          disabled={!selectedDate}
          bordered={false}
        >
          ЗАБРОНИРОВАТЬ
        </Button>
      </React.Fragment>
    </Modal>
  );
};

export { BookingModal };
