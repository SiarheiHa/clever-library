import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { get, onValue, query, ref } from 'firebase/database';

import { Book } from '../types/types';

import { api } from './api';
import { db } from './firebase';

const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      queryFn: () => {
        const booksRef = ref(db, 'books');

        return new Promise<QueryReturnValue<Book[], FetchBaseQueryError>>((resolve, reject) => {
          const booksQuery = query(booksRef);

          // Обработчик ошибок при получении данных
          const errorHandler = (error: Error) => {
            console.error('Ошибка при получении книг:', error);
            reject(error);
          };

          const completionHandler = () => {
            onValue(booksRef, (snapshot) => {
              const books = snapshot.val();

              resolve({ data: books });
            });
          };

          // Получаем данные с использованием метода get и обрабатываем результаты
          get(booksQuery).then(completionHandler).catch(errorHandler);
        });
      },
      providesTags: ['Books'], // Указываем теги, которые будут использоваться для инвалидации кэша
    }),
  }),
});

export const { useGetBooksQuery } = booksApi;
