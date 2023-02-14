import { useState } from 'react';

import { View } from '../../types/types';
import { BookList } from '../book-list';
import { Controls } from '../controls';

import styles from './books-section.module.scss';

const BooksSection = () => {
  const [view, setView] = useState<View>('table');

  const onViewSelect = (newView: View) => setView(newView);

  return (
    <section className={styles.books}>
      <Controls selectedButton={view} onViewClick={onViewSelect} />
      <BookList view={view} />
    </section>
  );
};

export { BooksSection };
