import { useParams } from 'react-router-dom';

import { useGetBooksQuery, useGetCategoriesQuery } from '../api';
import { selectSortingType, useAppSelector } from '../store';
import { Book, Category } from '../types/types';

const getCategoryNameByPath = (categories: Category[], path: string) =>
  categories.find((category) => category.path === path)?.name ?? '';

const filterBooksByCategory = (books: Book[], categoryName: string) =>
  books.filter((book) => book.categories.includes(categoryName));

const sortBooks = (books: Book[], sort: 'asc' | 'desc') =>
  books.sort((a, b) => {
    if (sort === 'asc') {
      return Number(a.rating) - Number(b.rating);
    }

    return Number(b.rating) - Number(a.rating);
  });

const filterAndSortBooks = (books: Book[], categoryName: string, sort: 'asc' | 'desc') => {
  if (!books.length) {
    return books;
  }

  let filteredBooks = [...books];

  if (categoryName) {
    filteredBooks = filterBooksByCategory(books, categoryName);
  }

  return sortBooks(filteredBooks, sort);
};

const useGetFilteredBooksQuery = () => {
  const useQueryHookResult = useGetBooksQuery();
  const { data: books } = useQueryHookResult;
  const { data: categories } = useGetCategoriesQuery();
  const { category } = useParams();
  const sort = useAppSelector(selectSortingType);

  if (books === undefined) {
    return useQueryHookResult;
  }

  const categoryName =
    category === 'all' || category === undefined ? '' : getCategoryNameByPath(categories ?? [], category);

  const booksForRender = filterAndSortBooks(books, categoryName, sort);

  return { ...useQueryHookResult, data: booksForRender };
};

export { useGetFilteredBooksQuery };
