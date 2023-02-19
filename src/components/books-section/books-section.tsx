import { useEffect, useState } from 'react';

import { useGetBooksQuery, useGetCategoriesQuery } from '../../api';
import { hideLoader, hideToast, showLoader, showToast, useAppDispatch } from '../../store';
import { View } from '../../types/types';
import { BookList } from '../book-list';
import { Controls } from '../controls';

import styles from './books-section.module.scss';

const BooksSection = () => {
  const [view, setView] = useState<View>('table');
  const onViewSelect = (newView: View) => setView(newView);
  const dispatch = useAppDispatch();
  const { data: books, error: booksError, isLoading: isBookLoading } = useGetBooksQuery('');
  const { data: categories, error: categoriesError, isLoading: isCategoriesLoading } = useGetCategoriesQuery('');
  const error = booksError || categoriesError;
  const isLoading = isBookLoading || isCategoriesLoading;

  useEffect(() => {
    dispatch(hideToast());
  }, [dispatch]);

  useEffect(() => {
    if (isLoading) {
      dispatch(hideToast());
      dispatch(showLoader());
    } else if (books && categories) {
      dispatch(hideLoader());
    }
  }, [books, categories, dispatch, error, isLoading]);

  useEffect(() => {
    if (error) {
      dispatch(showToast());
      dispatch(hideLoader());
    }
  }, [error, dispatch]);

  if (!books || error) {
    return null;
  }

  return (
    <section className={styles.books}>
      <Controls selectedButton={view} onViewClick={onViewSelect} />
      <BookList view={view} books={books} />
    </section>
  );
};

export { BooksSection };
