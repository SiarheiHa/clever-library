import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { BOOKS_MOCK } from '../../data';
import { View } from '../../types/types';
import { BookCard } from '../book-card';

import styles from './book-list.module.scss';

interface BookListProps {
  view: View;
}

const BookList: React.FC<BookListProps> = ({ view }) => {
  const books = BOOKS_MOCK;

  const classes = classNames(styles.main, view === 'list' ? styles.list : styles.table);

  return (
    <ul className={classes}>
      {books.map((book) => (
        <li key={book.id}>
          <NavLink to={`/books/${book.path}/${book.id}`}>
            <BookCard book={book} variant={view === 'list' ? 'large' : 'small'} />
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export { BookList };
