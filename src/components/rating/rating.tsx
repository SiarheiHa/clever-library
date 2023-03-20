import React from 'react';
import classNames from 'classnames';

import { ReactComponent as Star } from '../../assets/images/icons/star.svg';
import { ReactComponent as StarEmpty } from '../../assets/images/icons/star_empty.svg';

import styles from './rating.module.scss';

interface RatingProps {
  value: number;
  starsize?: 'l' | 'm' | 's' | 'xl';
  detail?: boolean;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({ className, value, detail = false, starsize = 'l' }) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < Math.round(value)) {
      stars.push(
        <div key={i} data-test-id='star'>
          <Star key={i} className={styles[starsize]} data-test-id='star-active' />
        </div>
      );
    } else {
      stars.push(
        <div key={i} data-test-id='star'>
          <StarEmpty key={i} className={styles[starsize]} />
        </div>
      );
    }
  }

  const classes = classNames(styles.rating, className);
  const classesDetailedText = classNames(value ? styles.value : styles.text_detail);

  const detailed = (
    <React.Fragment>
      <div data-test-id='rating' className={styles.rating}>
        {stars}
      </div>
      <span className={classesDetailedText}> {value ? value : 'ещё нет оценок'}</span>
    </React.Fragment>
  );

  const short = value ? (
    <div data-test-id='rating' className={styles.rating}>
      {stars}
    </div>
  ) : (
    <span className={styles.text}>ещё нет оценок</span>
  );

  return <div className={classes}>{detail ? detailed : short}</div>;
};

export { Rating };
