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
      stars.push(<Star key={i} className={styles[starsize]} />);
    } else {
      stars.push(<StarEmpty key={i} className={styles[starsize]} />);
    }
  }

  const classes = classNames(styles.rating, className);
  const classesDetailedText = classNames(value ? styles.value : styles.text_detail);

  const detailed = (
    <React.Fragment>
      {stars.map((star) => star)} <span className={classesDetailedText}> {value ? value : 'ещё нет оценок'}</span>
    </React.Fragment>
  );

  const short = value ? stars.map((star) => star) : <span className={styles.text}>ещё нет оценок</span>;

  return <div className={classes}>{detail ? detailed : short}</div>;
};

export { Rating };
