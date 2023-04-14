import React, { useEffect, useState } from 'react';

import { useAddCommentMutation } from '../../api/comment-api';
import { ReactComponent as Star } from '../../assets/images/icons/star.svg';
import { ReactComponent as StarEmpty } from '../../assets/images/icons/star_empty.svg';
import { hideLoader, showLoader, showToast, useAppDispatch } from '../../store';
import { UserDetail } from '../../types/types';
import { Button } from '../button';
import { Modal } from '../modal';

import styles from './review-modal.module.scss';

interface ReviewModalProps {
  bookId: number;
  isOpen: boolean;
  onClose: () => void;
  user: UserDetail;
  enableHideLoaderRef: React.MutableRefObject<boolean>;
}

const ReviewModal = ({ bookId, isOpen, onClose, user, enableHideLoaderRef }: ReviewModalProps) => {
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
    // eslint-disable-next-line no-param-reassign
    enableHideLoaderRef.current = false;
    // console.log('click');
    addComment({
      currentUser: user,
      data: {
        data: {
          book: String(bookId),
          rating,
          text: reviewText,
          user: String(user.id),
        },
      },

      // data: {
      //   book: String(bookId),
      //   rating,
      //   text: reviewText,
      //   user: String(user.id),
      // },
      // currentUser: user,
    });
  };

  useEffect(() => {
    if (isLoading) {
      // console.log('isLoading');
      // dispatch(showLoader());
    } else if (isSuccess) {
      reset();
      // console.log(15);
      // dispatch(hideLoader());
      dispatch(showToast({ mode: 'success', message: 'Спасибо, что нашли время оценить книгу!' }));
      onClose();
    } else if (isError) {
      reset();
      // console.log(16);
      // dispatch(hideLoader());
      dispatch(showToast({ mode: 'warning', message: 'Оценка не была отправлена. Попробуйте позже!' }));
      onClose();
    }
  }, [dispatch, isError, isLoading, isSuccess, onClose, reset]);

  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(
        <div key={i} data-test-id='star'>
          <Star className={styles.star} onClick={() => onStarClick(i)} data-test-id='star-active' />
        </div>
      );
    } else {
      stars.push(
        <div key={i} data-test-id='star'>
          <StarEmpty className={styles.star} onClick={() => onStarClick(i)} />
        </div>
      );
    }
  }

  return (
    <Modal title='Оцените книгу' isOpen={isOpen} onCancel={onClose} testId='modal-rate-book'>
      <React.Fragment>
        <div className={styles.rating}>
          <p className={styles.subtitle}>Ваша оценка</p>
          <div className={styles.stars} data-test-id='rating'>
            {stars}
          </div>
        </div>
        <textarea
          className={styles.textarea}
          placeholder='Оставить отзыв'
          value={reviewText}
          onChange={onTextareaChange}
          data-test-id='comment'
        />
        <Button onClick={sendComment} className={styles.button} contained={true} testId='button-comment'>
          ОЦЕНИТЬ
        </Button>
      </React.Fragment>
    </Modal>
  );
};

export { ReviewModal };
