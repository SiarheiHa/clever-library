import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { DataSnapshot, onValue, query, ref } from 'firebase/database';

import { BookDetail, BookingRequestData, BookingResponseData, ChangeBookingRequestData } from '../types/types';

import { api } from './api';
import { db } from './firebase';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBookById: builder.query<BookDetail, string>({
      queryFn: async (id) => {
        const booksRef = ref(db, 'booksExact');
        const booksQuery = query(booksRef);

        return new Promise<QueryReturnValue<BookDetail, FetchBaseQueryError>>((resolve, reject) => {
          const errorHandler = (error: Error) => {
            console.error(`Ошибка при получении книги с id ${id}:`, error);
            reject(error);
          };

          const completionHandler = (snapshot: DataSnapshot) => {
            const bookData = snapshot.val() as BookDetail[];
            const bookArray = Object.values(bookData); // Преобразование объекта данных в массив

            const targetBook = bookArray.find((item) => item.id === Number(id));

            if (targetBook) {
              resolve({ data: targetBook });
            } else {
              const error = new Error(`Книга с id ${id} не найдена.`);

              reject(error);
            }
          };

          onValue(booksQuery, completionHandler, errorHandler);
        });
      },
      providesTags: ['Book'],
    }),

    addBooking: builder.mutation<BookingResponseData, BookingRequestData>({
      query: (data) => ({
        url: '/bookings',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Book', 'Books'],
    }),

    deleteBooking: builder.mutation<BookingResponseData, string>({
      query: (bookingId) => ({
        url: `/bookings/${bookingId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Book', 'Books'],
    }),

    changeBooking: builder.mutation<BookingResponseData, ChangeBookingRequestData>({
      query: ({ bookingId, data }) => ({
        url: `/bookings/${bookingId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Book', 'Books'],
    }),
  }),
});

export const { useGetBookByIdQuery, useAddBookingMutation, useDeleteBookingMutation, useChangeBookingMutation } =
  bookApi;

export { bookApi };
