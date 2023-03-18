import { CommentRequestData, CommentResponseData } from '../types/types';

import { api } from './api';
import { Endpoint, HTTPMethod } from './api-enums';

const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation<CommentResponseData, CommentRequestData>({
      query: (data) => ({
        url: Endpoint.COMMENTS,
        method: HTTPMethod.POST,
        body: data,
      }),
      invalidatesTags: ['Book'],
    }),
  }),
});

export const { useAddCommentMutation } = commentApi;
