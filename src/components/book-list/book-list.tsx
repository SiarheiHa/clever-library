import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { selectSearchString, useAppSelector } from '../../store';
import { Book, View } from '../../types/types';
import { BookCard } from '../book-card';
import { SearchMessage } from '../search-message';

import styles from './book-list.module.scss';

interface BookListProps {
  view: View;
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books, view }) => {
  const { category: categoryParam } = useParams();
  const searchString = useAppSelector(selectSearchString);

  const booksForRender = books.filter((book) => book.title.toLowerCase().includes(searchString.toLowerCase().trim()));

  const classes = classNames(styles.main, view === 'list' ? styles.list : styles.table);

  return booksForRender.length ? (
    <ul className={classes} data-test-id='content'>
      {booksForRender.map((book) => {
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
  ) : (
    <SearchMessage text='По запросу ничего не найдено' testId='search-result-not-found' />
  );
};

export { BookList };
