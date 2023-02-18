import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { useGetBooksQuery, useGetCategoriesQuery } from '../../api';
import { hideLoader, showLoader, showToast, useAppDispatch } from '../../store';
import { View } from '../../types/types';
import { BookCard } from '../book-card';

import styles from './book-list.module.scss';

interface BookListProps {
  view: View;
}

const BookList: React.FC<BookListProps> = ({ view }) => {
  const { category: categoryParam } = useParams();
  const { data: books, error: booksError, isLoading: isBookLoading } = useGetBooksQuery('');
  const { data: categories, error: categoriesError, isLoading: isCategoriesLoading } = useGetCategoriesQuery('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (booksError || categoriesError) {
      dispatch(showToast());
    }
  }, [booksError, categoriesError, dispatch]);

  useEffect(() => {
    if (isBookLoading || isCategoriesLoading) {
      dispatch(showLoader());
    } else if (books && categories) {
      dispatch(hideLoader());
    }
  }, [books, categories, dispatch, isBookLoading, isCategoriesLoading]);

  const classes = classNames(styles.main, view === 'list' ? styles.list : styles.table);

  return (
    <ul className={classes}>
      {books &&
        !booksError &&
        !categoriesError &&
        books.map((book) => {
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
