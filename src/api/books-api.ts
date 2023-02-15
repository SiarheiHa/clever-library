import { Book } from '../types/types';

import { api } from './api';
import { Endpoint } from './api-enums';

const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], string>({
      query: () => ({
        url: Endpoint.BOOKS,
      }),
      providesTags: ['Books'],
    }),
  }),
});

export const { useGetBooksQuery } = booksApi;
