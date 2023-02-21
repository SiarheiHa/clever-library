import { useParams } from 'react-router-dom';

import { useGetBooksQuery, useGetCategoriesQuery } from '../api';
import { Book, Category } from '../types/types';

const getCategoryNameByPath = (categories: Category[], path: string) =>
  categories.find((category) => category.path === path)?.name ?? '';

const filterBooksByCategory = (books: Book[], categoryName: string) =>
  books.filter((book) => book.categories.includes(categoryName));

const filterBooks = (books: Book[], categoryName: string) => {
  if (!books.length) {
    return books;
  }

  let filteredBooks = [...books];

  if (categoryName) {
    filteredBooks = filterBooksByCategory(books, categoryName);
  }

  return filteredBooks;
};

const useGetFilteredBooksQuery = (): ReturnType<typeof useGetBooksQuery> => {
  const useQueryHookResult = useGetBooksQuery('');
  const { data: books } = useQueryHookResult;
  const { data: categories } = useGetCategoriesQuery('');
  const { category } = useParams();

  if (books === undefined) {
    return useQueryHookResult;
  }

  const categoryName =
    category === 'all' || category === undefined ? '' : getCategoryNameByPath(categories ?? [], category);

  const booksForRender = filterBooks(books, categoryName);

  return { ...useQueryHookResult, data: booksForRender };
};

export { useGetFilteredBooksQuery };
