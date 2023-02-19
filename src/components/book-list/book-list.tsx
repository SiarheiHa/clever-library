import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Book, View } from '../../types/types';
import { BookCard } from '../book-card';

import styles from './book-list.module.scss';

interface BookListProps {
  view: View;
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books, view }) => {
  const { category: categoryParam } = useParams();
  const classes = classNames(styles.main, view === 'list' ? styles.list : styles.table);

  return (
    <ul className={classes}>
      {books.map((book) => {
        const categoryPath = categoryParam ?? 'all';

        return (
          <li key={book.id}>
            <NavLink to={`/books/${categoryPath}/${book.id}`}>
              <BookCard book={book} variant={view === 'list' ? 'large' : 'small'} />
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export { BookList };
