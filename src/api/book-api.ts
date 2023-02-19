import { BookDetail } from '../types/types';

import { api } from './api';
import { Endpoint } from './api-enums';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBookById: builder.query<BookDetail, string>({
      query: (id) => ({
        url: `${Endpoint.BOOKS}${id}`,
      }),
      providesTags: ['Book'],
    }),
  }),
});

export const { useGetBookByIdQuery } = bookApi;
