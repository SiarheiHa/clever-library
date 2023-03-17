import React from 'react';

import commentAvatar from '../../assets/images/comment-avatar.png';
import { Comment } from '../../types/types';
import { getURI } from '../../utils';
import { Rating } from '../rating';

import styles from './comments-block.module.scss';

interface CommentsProps {
  comments: Comment[];
}

const CommentsBlock: React.FC<CommentsProps> = ({ comments }) => (
  <div className={styles.wrapper}>
    {Boolean(comments.length) && (
      <ul className={styles.comments}>
        {comments.map((comment) => {
          const {
            createdAt,
            id,
            rating,
            text,
            user: { avatarUrl, firstName, lastName },
          } = comment;

          const avatarSrc = avatarUrl ? getURI(avatarUrl) : commentAvatar;

          const date = new Date(createdAt).toLocaleString('ru', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          return (
            <li className={styles.comment} key={id} data-test-id='comment-wrapper'>
              <div className={styles.data}>
                <img src={avatarSrc} className={styles.avatar} alt='avatar' />
                <div className={styles.data__user}>
                  <span className={styles.subtitle} data-test-id='comment-wrapper'>{`${firstName} ${lastName}`}</span>
                  <span className={styles.subtitle} data-test-id='comment-date'>
                    {date}
                  </span>
                </div>
              </div>
              <Rating value={rating} className={styles.rating} />
              {Boolean(text) && (
                <p className={styles.text} data-test-id='comment-text'>
                  {text}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    )}
  </div>
);

export { CommentsBlock };
