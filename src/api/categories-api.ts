import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { DataSnapshot, get, onValue, query, ref } from 'firebase/database';

import { Category } from '../types/types';

import { api } from './api';
import { db } from './firebase';

const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      queryFn: () => {
        const categoriesRef = ref(db, 'categories');

        return new Promise<QueryReturnValue<Category[], FetchBaseQueryError>>((resolve, reject) => {
          const categoriesQuery = query(categoriesRef);

          // Обработчик ошибок при получении данных
          const errorHandler = (error: Error) => {
            console.error('Ошибка при получении категорий:', error);
            reject(error);
          };

          const completionHandler = (snapshot: DataSnapshot) => {
            const categories = snapshot.val();

            resolve({ data: categories });
          };

          // Получаем данные с использованием метода get и обрабатываем результаты
          get(categoriesQuery).then(completionHandler).catch(errorHandler);
        });
      },

      providesTags: ['Categories'],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
