import React, { useEffect } from 'react';

import { useAddBookingMutation, useChangeBookingMutation, useDeleteBookingMutation } from '../../api/book-api';
import { hideLoader, showLoader, showToast, useAppDispatch } from '../../store';
import { Book, BookDetail } from '../../types/types';
import { checkDateIsEqual } from '../../utils/date';
import { Button } from '../button';
import { Calendar } from '../calendar/calendar';
import { Modal } from '../modal';

import styles from './booking-modal.module.scss';

interface ReviewModalProps {
  book: BookDetail | Book;
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
      // console.log(4);
      dispatch(hideLoader());
      dispatch(
        showToast({ mode: 'success', message: 'Книга забронирована. Подробности можно посмотреть на странице Профиль' })
      );
      onClose();
    } else if (isErrorAdd) {
      resetAdd();
      // console.log(5);
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
      // console.log(6);
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
      // console.log(7);
      dispatch(hideLoader());
      dispatch(showToast({ mode: 'warning', message: 'Не удалось снять бронирование книги. Попробуйте позже!' }));
      onClose();
    }
  }, [dispatch, isErrorDelete, isLoadingDelete, isSuccessDelete, onClose, resetDelete]);

  useEffect(() => {
    if (isLoadingChange) {
      dispatch(showLoader());
    } else if (isSuccessChange) {
      resetChange();
      // console.log(8);
      dispatch(hideLoader());
      dispatch(
        showToast({
          mode: 'success',
          message: 'Изменения успешно сохранены!',
        })
      );
      onClose();
    } else if (isErrorChange) {
      resetChange();
      // console.log(9);
      dispatch(hideLoader());
      dispatch(
        showToast({
          mode: 'warning',
          message: 'Изменения не были сохранены. Попробуйте позже!',
        })
      );
      onClose();
    }
  }, [dispatch, isErrorChange, isLoadingChange, isSuccessChange, onClose, resetChange]);

  const cancelBooking = () => {
    if (book.booking?.id) deleteBooking(String(book.booking.id));
  };

  const sendBooking = () => {
    if (book.booking && selectedDate) {
      const value = selectedDate.getTimezoneOffset();
      const changedDate = new Date(selectedDate.getTime() - value * 60 * 1000).toISOString();

      // put
      changeBooking({
        bookingId: String(book.booking.id),
        data: {
          order: true,
          dateOrder: changedDate,
          book: String(book.id),
          customer: String(userId),
        },
      });
    } else if (selectedDate) {
      const value = selectedDate.getTimezoneOffset();
      const changedDate = new Date(selectedDate.getTime() - value * 60 * 1000).toISOString();

      // post
      addBooking({
        data: {
          order: true,
          dateOrder: changedDate,
          book: String(book.id),
          customer: String(userId),
        },
      });
    }
  };

  const checkShouldDisabled = () => {
    if (!book.booking && !selectedDate) {
      return true;
    }

    if (!book.booking && selectedDate) {
      return false;
    }

    if (book?.booking?.dateOrder && selectedDate) {
      return checkDateIsEqual(selectedDate, new Date(book.booking.dateOrder));
    }

    return false;
  };

  return (
    <Modal title={modaltitle} isOpen={isOpen} onCancel={onClose} testId='booking-modal'>
      <React.Fragment>
        <Calendar selectedDate={selectedDate} selectDate={(date) => setSelectedDate(date)} />
        <div className={styles.buttons}>
          <Button
            onClick={sendBooking}
            className={styles.button}
            contained={!checkShouldDisabled()}
            disabled={checkShouldDisabled()}
            bordered={false}
            testId='booking-button'
          >
            ЗАБРОНИРОВАТЬ
          </Button>
          {book.booking && (
            <Button onClick={cancelBooking} className={styles.cancel_btn} testId='booking-cancel-button'>
              ОТМЕНИТЬ БРОНЬ
            </Button>
          )}
        </div>
      </React.Fragment>
    </Modal>
  );
};

export { BookingModal };
