import { BookDetail } from '../types/types';

import { api } from './api';
import { Endpoint } from './api-enums';

const currentUserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<BookDetail, unknown>({
      query: () => ({
        url: Endpoint.ME,
      }),
      providesTags: ['CurrentUser'],
    }),
  }),
});

export const { useGetCurrentUserQuery } = currentUserApi;
