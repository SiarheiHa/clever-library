import React from 'react';

import { BOOK_FEATURES_MOCK, vocabulary } from '../../data';
import { Book, Feature } from '../../types/types';

import styles from './detail-info.module.scss';

interface DetailInfoProps {
  book: Book;
}

const columnFirst: Feature[] = ['publishing', 'year', 'pages', 'coverType', 'format'];
const columnSecond: Feature[] = ['genre', 'weight', 'isbn', 'manufacturer'];
const columns = [columnFirst, columnSecond];

const DetailInfo: React.FC<DetailInfoProps> = ({ book }) => (
  <div className={styles.wrapper}>
    {columns.map((column) => (
      <ul className={styles.column} key={column[0]}>
        {column.map((feature) => (
          <li key={feature} className={styles.feature}>
            <span className={styles.feature__name}>{vocabulary[feature]}</span>
            <span className={styles.feature__value}>{BOOK_FEATURES_MOCK[feature]}</span>
          </li>
        ))}
      </ul>
    ))}
  </div>
);

export { DetailInfo };
