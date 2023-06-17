import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { DataSnapshot, get, onChildAdded, query, ref } from 'firebase/database';

import { Book } from '../types/types';

import { api } from './api';
import { db } from './firebase';

const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      queryFn: async () => {
        const booksRef = ref(db, 'books');

        return new Promise<QueryReturnValue<Book[], FetchBaseQueryError>>((resolve, reject) => {
          const books: Book[] = [];

          const booksQuery = query(booksRef);

          // Подписываемся на событие onChildAdded, которое срабатывает при добавлении нового дочернего узла
          const booksListener = onChildAdded(booksQuery, (childSnapshot: DataSnapshot) => {
            // Получаем данные новой книги из снимка
            const book = childSnapshot.val() as Book;

            // Добавляем книгу в массив
            books.push(book);
          });

          // Обработчик ошибок при получении данных
          const errorHandler = (error: Error) => {
            console.error('Ошибка при получении книг:', error);
            reject(error);
          };

          // Обработчик успешного завершения получения данных
          const completionHandler = () => {
            // Отписываемся от события onChildAdded
            onChildAdded(booksQuery, booksListener);

            // Возвращаем данные книг в виде QueryReturnValue
            resolve({ data: books });
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
