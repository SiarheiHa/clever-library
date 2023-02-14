import React from 'react';

import reviewAvatar from '../../assets/images/review-avatar.png';
import { Review } from '../../types/types';
import { Button } from '../button';
import { Rating } from '../rating';

import styles from './reviews.module.scss';

interface ReviewsProps {
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => (
  <div className={styles.wrapper}>
    {Boolean(reviews.length) && (
      <ul className={styles.reviews}>
        {reviews.map((review) => (
          <li className={styles.review} key={review.id}>
            <div className={styles.data}>
              <img src={reviewAvatar} className={styles.avatar} alt='avatar' />
              <div className={styles.data__user}>
                <span className={styles.subtitle}>{review.user}</span>
                <span className={styles.subtitle}>{review.date}</span>
              </div>
            </div>
            <Rating value={review.rating} className={styles.rating} />
            {Boolean(review.text) && <p className={styles.text}>{review.text}</p>}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export { Reviews };
