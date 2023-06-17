import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '../store/store';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '', // Мы не будем использовать базовый URL в Firebase Realtime Database
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.userInfo?.jwt;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ['CurrentUser', 'Books', 'Book', 'Categories'],
  endpoints: () => ({}),
});

export { api };
