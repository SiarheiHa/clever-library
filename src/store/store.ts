import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { menuReducer } from './menu-slice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppStore = typeof store;
