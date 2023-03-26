import { Category } from '../types/types';

import { api } from './api';
import { Endpoint } from './api-enums';

const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], string>({
      query: () => ({
        url: Endpoint.CATERGORIES,
      }),
      providesTags: ['Categories'],
    }),
  }),
});

export const { useGetCategoriesQuery, useLazyGetCategoriesQuery } = categoriesApi;
