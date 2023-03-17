import { BookDetail, BookingRequestData, BookingResponseData, ChangeBookingRequestData } from '../types/types';

import { api } from './api';
import { Endpoint, HTTPMethod } from './api-enums';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBookById: builder.query<BookDetail, string>({
      query: (id) => ({
        url: `${Endpoint.BOOKS}${id}`,
      }),
      providesTags: ['Book'],
    }),
    addBooking: builder.mutation<BookingResponseData, BookingRequestData>({
      query: (data) => ({
        url: Endpoint.BOOKINGS,
        method: HTTPMethod.POST,
        body: data,
      }),
      invalidatesTags: ['Book', 'Books'],
    }),
    deleteBooking: builder.mutation<BookingResponseData, string>({
      query: (bookingId) => ({
        url: `${Endpoint.BOOKINGS}/${bookingId}`,
        method: HTTPMethod.DELETE,
      }),
      invalidatesTags: ['Book', 'Books'],
    }),
    changeBooking: builder.mutation<BookingResponseData, ChangeBookingRequestData>({
      query: ({ bookingId, data }) => ({
        url: `${Endpoint.BOOKINGS}/${bookingId}`,
        method: HTTPMethod.PUT,
        body: data,
      }),
      invalidatesTags: ['Book', 'Books'],
    }),
  }),
});

export const { useGetBookByIdQuery, useAddBookingMutation, useDeleteBookingMutation, useChangeBookingMutation } =
  bookApi;
