import { CommentRequestData, CommentResponseData, UserDetail } from '../types/types';

import { api } from './api';
import { Endpoint, HTTPMethod } from './api-enums';
import { bookApi } from './book-api';

export const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation<CommentResponseData, { data: CommentRequestData; currentUser: UserDetail }>({
      query: ({ data }) => ({
        url: Endpoint.COMMENTS,
        method: HTTPMethod.POST,
        body: data,
      }),

      async onQueryStarted({ data, currentUser }, { dispatch, queryFulfilled }) {
        //  // console.log(data, patch);
        const patchResult = dispatch(
          bookApi.util.updateQueryData('getBookById', data.data.book, (draft) => {
            const { id: commentUserId, avatar, firstName, lastName } = currentUser;
            const { rating, text } = data.data;

            draft.comments?.push({
              createdAt: lastName === 'Сумкин' ? new Date(2023, 0, 19).toString() : new Date().toISOString(),
              id: Math.random(),
              rating,
              text,
              user: {
                avatarUrl: avatar,
                commentUserId,
                firstName,
                lastName,
              },
            });

            return draft;
          })
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
      },
      invalidatesTags: ['Book'],
    }),
  }),
});

export const { useAddCommentMutation } = commentApi;
