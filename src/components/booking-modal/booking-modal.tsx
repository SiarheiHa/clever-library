import React, { useEffect, useState } from 'react';

import { formatDate } from '../../utils/date';
import { Button } from '../button';
import { Calendar } from '../calendar/calendar';
import { Modal } from '../modal';

import styles from './booking-modal.module.scss';

interface ReviewModalProps {
  bookId: number;
  isOpen: boolean;
  onClose: () => void;
  userId: number;
}

const BookingModal = ({ bookId, isOpen, onClose, userId }: ReviewModalProps) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const sendBooking = () => {
    console.log(selectedDate);
  };

  return (
    <Modal title='Выбор даты бронирования' isOpen={isOpen} onCancel={onClose}>
      <React.Fragment>
        <div className='date__container'>{formatDate(selectedDate, 'DDD DD MMM YYYY')}</div>
        <Calendar selectedDate={selectedDate} selectDate={(date) => setSelectedDate(date)} />
        <Button onClick={sendBooking} className={styles.button} contained={true}>
          ЗАБРОНИРОВАТЬ
        </Button>
      </React.Fragment>
    </Modal>
  );
};

export { BookingModal };
