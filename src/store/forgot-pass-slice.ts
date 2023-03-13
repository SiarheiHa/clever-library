import { createSlice } from '@reduxjs/toolkit';

import { ForgotPassState } from '../types/types';

import { requestRefreshLink } from './actions';
import { RootState } from './store';

const initialState: ForgotPassState = {
  loading: false,
  errorMessage: null,
  error: null,
  success: false,
};

const forgotPassSlice = createSlice({
  name: 'forgot',
  initialState,
  reducers: {
    resetForgotPassState(state) {
      state.error = null;
      state.loading = false;
      state.success = false;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestRefreshLink.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.errorMessage = null;
    });
    builder.addCase(requestRefreshLink.fulfilled, (state, action) => {
      console.log(action);
      state.loading = false;
      state.success = true;
      state.error = null;
      state.errorMessage = null;
    });
    builder.addCase(requestRefreshLink.rejected, (state, action) => {
      console.log(action);
      state.loading = false;
      state.success = false;
      state.error = 1;
      state.errorMessage = action.payload || null;
    });
  },
});

const { resetForgotPassState } = forgotPassSlice.actions;
const forgotPassReducer = forgotPassSlice.reducer;
const selectForgotPassState = ({ forgot }: RootState) => forgot;

export { forgotPassReducer, resetForgotPassState, selectForgotPassState };
