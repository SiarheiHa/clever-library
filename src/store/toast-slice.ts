import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

export type ToastState = {
  isVisible: boolean;
  mode: 'warning' | 'success';
  message: string;
};

const initialToastState: ToastState = {
  isVisible: false,
  mode: 'warning',
  message: '',
};

const toastSlice = createSlice({
  name: 'toast',
  initialState: initialToastState,
  reducers: {
    showToast: (state: ToastState, action: PayloadAction<Omit<ToastState, 'isVisible'>>) => {
      console.log('showToast action');
      state.message = action.payload.message;
      state.mode = action.payload.mode;
      state.isVisible = true;
    },
    hideToast: (state: ToastState) => {
      console.log('hideToast action');
      state.isVisible = false;
    },
  },
});

const { hideToast, showToast } = toastSlice.actions;
const toastReducer = toastSlice.reducer;
const selectToastVisibility = ({ toast }: RootState) => toast.isVisible;
const selectToastState = ({ toast }: RootState) => toast;

export { toastReducer, selectToastVisibility, selectToastState, hideToast, showToast };
