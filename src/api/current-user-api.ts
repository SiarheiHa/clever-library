import {
  RegistrationFormData,
  UpdateAvatarRequestData,
  UpdateUserRequestData,
  UploadResponseData,
  UserDetail,
} from '../types/types';

import { api } from './api';
import { Endpoint, HTTPMethod } from './api-enums';

const currentUserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<UserDetail, '1'>({
      query: () => ({
        url: Endpoint.ME,
      }),
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
