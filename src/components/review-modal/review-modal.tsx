import React, { useState } from 'react';

import { ReactComponent as Star } from '../../assets/images/icons/star.svg';
import { ReactComponent as StarEmpty } from '../../assets/images/icons/star_empty.svg';
import { Button } from '../button';
import { Modal } from '../modal';

import styles from './review-modal.module.scss';

interface ReviewModalProps {
  isOpen: boolean;
  onCancel: () => void;
  children: JSX.Element | string;
}

const ReviewModal = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const onTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  const onStarClick = (index: number) => {
    setRating(index + 1);
  };

  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<Star key={i} className={styles.star} onClick={() => onStarClick(i)} />);
    } else {
      stars.push(<StarEmpty key={i} className={styles.star} onClick={() => onStarClick(i)} />);
    }
  }

  return (
    <Modal title='Оцените книгу' isOpen={true} onCancel={() => {}}>
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
        <Button onClick={() => {}} className={styles.button} contained={true}>
          ОЦЕНИТЬ
        </Button>
      </React.Fragment>
    </Modal>
  );
};

export { ReviewModal };
