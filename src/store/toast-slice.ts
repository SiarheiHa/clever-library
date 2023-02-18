import { createSlice } from '@reduxjs/toolkit';

import { RootState } from './store';

export type ToastState = {
  isVisible: boolean;
};

const initialToastState: ToastState = {
  isVisible: false,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState: initialToastState,
  reducers: {
    showToast: (state: ToastState) => {
      state.isVisible = true;
    },
    hideToast: (state: ToastState) => {
      state.isVisible = false;
    },
  },
});

const { hideToast, showToast } = toastSlice.actions;
const toastReducer = toastSlice.reducer;
const selectToastVisibility = ({ toast }: RootState) => toast.isVisible;

export { toastReducer, selectToastVisibility, hideToast, showToast };
