import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { api } from '../api';

import { forgotPassReducer } from './forgot-pass-slice';
import { loaderReducer } from './loader-slice';
import { menuReducer } from './menu-slice';
import { registrationReducer } from './registration-slice';
import { passReducer } from './reset-pass-slice';
import { searchReducer } from './search-slice';
import { sortingReducer } from './sorting-slice';
import { toastReducer } from './toast-slice';
import { userReducer } from './user-slice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    [api.reducerPath]: api.reducer,
    toast: toastReducer,
    loader: loaderReducer,
    registration: registrationReducer,
    sort: sortingReducer,
    search: searchReducer,
    user: userReducer,
    forgot: forgotPassReducer,
    pass: passReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppStore = typeof store;
