import React, { useEffect, useState } from 'react';

import { useAddCommentMutation } from '../../api/comment-api';
import { ReactComponent as Star } from '../../assets/images/icons/star.svg';
import { ReactComponent as StarEmpty } from '../../assets/images/icons/star_empty.svg';
import { hideLoader, showLoader, showToast, useAppDispatch } from '../../store';
import { Button } from '../button';
import { Modal } from '../modal';

import styles from './review-modal.module.scss';

interface ReviewModalProps {
  bookId: number;
  isOpen: boolean;
  onClose: () => void;
  userId: number;
}

const ReviewModal = ({ bookId, isOpen, onClose, userId }: ReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const dispatch = useAppDispatch();
  const [addComment, { isError, isLoading, isSuccess, reset }] = useAddCommentMutation();

  const onTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  const onStarClick = (index: number) => {
    setRating(index + 1);
  };

  const sendComment = () => {
    addComment({
      data: {
        book: String(bookId),
        rating,
        text: reviewText,
        user: String(userId),
      },
    });
  };

  useEffect(() => {
    if (isLoading) {
      console.log('loading');
      dispatch(showLoader());
    } else if (isSuccess) {
      console.log('succes');
      reset();
      dispatch(hideLoader());
      dispatch(showToast({ mode: 'success', message: 'Спасибо, что нашли время оценить книгу!' }));
      onClose();
    } else if (isError) {
      console.log('error');
      reset();
      dispatch(hideLoader());
      dispatch(showToast({ mode: 'warning', message: 'Оценка не была отправлена. Попробуйте позже!' }));
      onClose();
    }
  }, [dispatch, isError, isLoading, isSuccess, onClose, reset]);

  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<Star key={i} className={styles.star} onClick={() => onStarClick(i)} />);
    } else {
      stars.push(<StarEmpty key={i} className={styles.star} onClick={() => onStarClick(i)} />);
    }
  }

  return (
    <Modal title='Оцените книгу' isOpen={isOpen} onCancel={onClose}>
      <React.Fragment>
        <div className={styles.rating}>
          <p className={styles.subtitle}>Ваша оценка</p>
          <div className={styles.stars}>{stars}</div>
        </div>
        <textarea
          className={styles.textarea}
          placeholder='Оставить отзыв'
          value={reviewText}
          onChange={onTextareaChange}
        />
        <Button onClick={sendComment} className={styles.button} contained={true}>
          ОЦЕНИТЬ
        </Button>
      </React.Fragment>
    </Modal>
  );
};

export { ReviewModal };
