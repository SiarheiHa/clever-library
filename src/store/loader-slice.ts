import { createSlice } from '@reduxjs/toolkit';

import { RootState } from './store';

export type LoaderState = {
  isVisible: boolean;
};

const initialLoaderState: LoaderState = {
  isVisible: false,
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState: initialLoaderState,
  reducers: {
    showLoader: (state: LoaderState) => {
      state.isVisible = true;
    },
    hideLoader: (state: LoaderState) => {
      state.isVisible = false;
    },
  },
});

const { hideLoader, showLoader } = loaderSlice.actions;
const loaderReducer = loaderSlice.reducer;
const selectLoaderVisibility = ({ loader }: RootState) => loader.isVisible;

export { loaderReducer, selectLoaderVisibility, hideLoader, showLoader };
