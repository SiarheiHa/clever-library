import { useGetBooksQuery, useGetCategoriesQuery } from '../api';

const useBookCountByCategory = () => {
  const { data: books } = useGetBooksQuery('');
  const { data: categories } = useGetCategoriesQuery('');

  const booksCountObj: Record<string, number> = {};

  if (!books || !categories) {
    return booksCountObj;
  }

  books.forEach((book) => {
    book.categories.forEach((category) => {
      if (booksCountObj[category]) {
        booksCountObj[category] += 1;
      } else booksCountObj[category] = 1;
    });
  });

  console.log(booksCountObj);

  return booksCountObj;
};

export { useBookCountByCategory };
