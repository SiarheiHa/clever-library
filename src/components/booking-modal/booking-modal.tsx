import React, { useEffect, useState } from 'react';

import { useAddBookingMutation, useChangeBookingMutation, useDeleteBookingMutation } from '../../api/book-api';
import { hideLoader, showLoader, showToast, useAppDispatch } from '../../store';
import { BookDetail } from '../../types/types';
import { checkDateIsEqual, formatDate } from '../../utils/date';
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
  const modaltitle = book.booking ? 'Изменение даты бронирования' : 'Выбор даты бронирования';
  const [addBooking, { isError: isErrorAdd, isLoading: isLoadingAdd, isSuccess: isSuccessAdd, reset: resetAdd }] =
    useAddBookingMutation();
  const [
    deleteBooking,
    { isError: isErrorDelete, isLoading: isLoadingDelete, isSuccess: isSuccessDelete, reset: resetDelete },
  ] = useDeleteBookingMutation();

  const [
    changeBooking,
    { isError: isErrorChange, isLoading: isLoadingChange, isSuccess: isSuccessChange, reset: resetChange },
  ] = useChangeBookingMutation();

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    book.booking ? new Date(book.booking.dateOrder) : null
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoadingAdd) {
      dispatch(showLoader());
    } else if (isSuccessAdd) {
      resetAdd();
      dispatch(hideLoader());
      dispatch(
        showToast({ mode: 'success', message: 'Книга забронирована. Подробности можно посмотреть на странице Профиль' })
      );
      onClose();
    } else if (isErrorAdd) {
      resetAdd();
      dispatch(hideLoader());
      dispatch(
        showToast({ mode: 'warning', message: 'Что-то пошло не так, книга не забронирована. Попробуйте позже!' })
      );
      onClose();
    }
  }, [dispatch, isErrorAdd, isLoadingAdd, isSuccessAdd, onClose, resetAdd]);

  useEffect(() => {
    if (isLoadingDelete) {
      dispatch(showLoader());
    } else if (isSuccessDelete) {
      resetDelete();
      dispatch(hideLoader());
      dispatch(
        showToast({
          mode: 'success',
          message: 'Бронирование книги успешно отменено!',
        })
      );
      onClose();
    } else if (isErrorDelete) {
      resetDelete();
      dispatch(hideLoader());
      dispatch(showToast({ mode: 'warning', message: 'Не удалось отменить бронирование книги. Попробуйте позже!' }));
      onClose();
    }
  }, [dispatch, isErrorDelete, isLoadingDelete, isSuccessDelete, onClose, resetDelete]);

  useEffect(() => {
    if (isLoadingChange) {
      dispatch(showLoader());
    } else if (isSuccessChange) {
      resetChange();
      dispatch(hideLoader());
      dispatch(
        showToast({
          mode: 'success',
          message: 'Бронирование новой даты успешно изменено. Подробности можно посмотреть на странице Профиль',
        })
      );
      onClose();
    } else if (isErrorChange) {
      resetChange();
      dispatch(hideLoader());
      dispatch(
        showToast({
          mode: 'warning',
          message: 'Что-то пошло не так, дату бронирования не удалось изменить. Попробуйте позже!',
        })
      );
      onClose();
    }
  }, [dispatch, isErrorChange, isLoadingChange, isSuccessChange, onClose, resetChange]);

  const cancelBooking = () => {
    if (book.booking?.id) deleteBooking(String(book.booking.id));
  };

  const sendBooking = () => {
    console.log(selectedDate?.toISOString());
    if (book.booking && selectedDate) {
      // put
      changeBooking({
        bookingId: String(book.booking.id),
        data: {
          order: true,
          dateOrder: selectedDate.toISOString(),
          book: String(book.id),
          customer: String(userId),
        },
      });
    } else if (selectedDate) {
      // post
      addBooking({
        data: {
          order: true,
          dateOrder: selectedDate.toISOString(),
          book: String(book.id),
          customer: String(userId),
        },
      });
    }
  };

  const checkShouldDisabled = () => {
    if (!book.booking && !selectedDate) {
      console.log('true');

      return true;
    }

    if (!book.booking && selectedDate) {
      console.log('false');

      return false;
    }

    if (book?.booking?.dateOrder && selectedDate) {
      return checkDateIsEqual(selectedDate, new Date(book.booking.dateOrder));
    }

    return false;
  };

  return (
    <Modal title={modaltitle} isOpen={isOpen} onCancel={onClose}>
      <React.Fragment>
        <div className='date__container'>{selectedDate && formatDate(selectedDate, 'DDD DD MMM YYYY')}</div>
        <Calendar selectedDate={selectedDate} selectDate={(date) => setSelectedDate(date)} />
        <div className={styles.buttons}>
          <Button
            onClick={sendBooking}
            className={styles.button}
            contained={!checkShouldDisabled()}
            // disabled={!selectedDate || checkShouldDisabled()}
            disabled={checkShouldDisabled()}
            bordered={false}
          >
            ЗАБРОНИРОВАТЬ
          </Button>
          {book.booking && (
            <Button onClick={cancelBooking} className={styles.cancel_btn}>
              ОТМЕНИТЬ БРОНЬ
            </Button>
          )}
        </div>
      </React.Fragment>
    </Modal>
  );
};

export { BookingModal };
