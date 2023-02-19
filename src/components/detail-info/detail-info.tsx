import React from 'react';

import { vocabulary } from '../../data';
import { BookDetail, Feature } from '../../types/types';

import styles from './detail-info.module.scss';

interface DetailInfoProps {
  book: BookDetail;
}

const columnFirst: Feature[] = ['publish', 'issueYear', 'pages', 'cover', 'format'];
const columnSecond: Feature[] = ['categories', 'weight', 'ISBN', 'producer'];
const columns = [columnFirst, columnSecond];

const DetailInfo: React.FC<DetailInfoProps> = ({ book }) => (
  <div className={styles.wrapper}>
    {columns.map((column) => (
      <ul className={styles.column} key={column[0]}>
        {column.map((feature) => (
          <li key={feature} className={styles.feature}>
            <span className={styles.feature__name}>{vocabulary[feature]}</span>
            <span className={styles.feature__value}>
              {Array.isArray(book[feature]) ? (book[feature] as string[]).join(', ') : book[feature]}
            </span>
          </li>
        ))}
      </ul>
    ))}
  </div>
);

export { DetailInfo };
