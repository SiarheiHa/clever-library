import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { DataSnapshot, get, onChildAdded, query, ref } from 'firebase/database';

import { Category } from '../types/types';

import { api } from './api';
import { db } from './firebase';

const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      queryFn: async () => {
        const categoriesRef = ref(db, 'categories');

        return new Promise<QueryReturnValue<Category[], FetchBaseQueryError>>((resolve, reject) => {
          const categories: Category[] = [];

          const categoriesQuery = query(categoriesRef);
          const categoriesListener = onChildAdded(categoriesQuery, (childSnapshot: DataSnapshot) => {
            const category = childSnapshot.val() as Category;

            categories.push(category);
          });

          // Обработка ошибок при получении данных
          const errorHandler = (error: Error) => {
            console.error('Ошибка при получении категорий:', error);
            reject(error);
          };

          const completionHandler = () => {
            onChildAdded(categoriesQuery, categoriesListener); // Отписка от прослушивания событий
            resolve({ data: categories });
          };

          get(categoriesQuery).then(completionHandler).catch(errorHandler);
        });
      },

      providesTags: ['Categories'],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
