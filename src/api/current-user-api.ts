import { get, ref } from 'firebase/database';

import {
  RegistrationFormData,
  UpdateAvatarRequestData,
  UpdateUserRequestData,
  UploadResponseData,
  UserDetail,
} from '../types/types';

import { api } from './api';
import { Endpoint, HTTPMethod } from './api-enums';
import { db } from './firebase';

const currentUserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<UserDetail, string>({
      async queryFn(userId) {
        try {
          // Определяем путь к месту, где хранятся данные текущего пользователя
          const userDetailRef = ref(db, `userDetails/${userId}`);
          console.log(userId);

          // Получаем данные о текущем пользователе из Firebase Realtime Database
          const snapshot = await get(userDetailRef);
          const userDetail = snapshot.val() as UserDetail | null;

          if (userDetail) {
            return { data: userDetail };
          }
          throw new Error('Данные текущего пользователя не найдены.');
        } catch (error) {
          console.error('Ошибка при получении данных текущего пользователя из Firebase:', error);
          throw error;
        }
      },
      providesTags: ['CurrentUser'],
    }),
    uploadFile: builder.mutation<UploadResponseData, FormData>({
      query: (data) => ({
        url: Endpoint.UPLOAD,
        method: HTTPMethod.POST,
        body: data,
      }),
    }),
    updateUserAvatar: builder.mutation<UserDetail, UpdateAvatarRequestData>({
      query: ({ data, id }) => ({
        url: `${Endpoint.USERS}${id}`,
        method: HTTPMethod.PUT,
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
        try {
          const { data: newUserData } = await queryFulfilled;
          const patchResult = dispatch(
            currentUserApi.util.updateQueryData('getCurrentUser', '1', (draft) => newUserData)
          );

          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();

            /**
             * Alternatively, on failure you can invalidate the corresponding cache tags
             * to trigger a re-fetch:
             * dispatch(api.util.invalidateTags(['Post']))
             */
          }
        } catch (e) {
          console.error(e);
        }
      },
    }),

    updateUser: builder.mutation<UserDetail, UpdateUserRequestData>({
      query: ({ id, data }) => ({
        url: `${Endpoint.USERS}${id}`,
        method: HTTPMethod.PUT,
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: newUserData } = await queryFulfilled;
          const patchResult = dispatch(currentUserApi.util.updateQueryData('getCurrentUser', '1', () => newUserData));

          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();

            /**
             * Alternatively, on failure you can invalidate the corresponding cache tags
             * to trigger a re-fetch:
             * dispatch(api.util.invalidateTags(['Post']))
             */
          }
        } catch (e) {
          console.error(e);
        }
      },
    }),
  }),
});

export const { useGetCurrentUserQuery, useUploadFileMutation, useUpdateUserAvatarMutation, useUpdateUserMutation } =
  currentUserApi;
