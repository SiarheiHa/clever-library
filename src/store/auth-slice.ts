import { createSlice } from '@reduxjs/toolkit';

import { AuthState } from '../types/types';

import { auth } from './actions';
import { RootState } from './store';

const initialState: AuthState = {
  loading: false,
  error: null,
  success: false,
  userAuthData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut(state) {
      state.error = null;
      state.loading = false;
      state.success = false;
      state.userAuthData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(auth.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(auth.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.userAuthData = action.payload;
    });
    builder.addCase(auth.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload || 1;
    });
  },
});

const { logOut } = authSlice.actions;
const authReducer = authSlice.reducer;
const selectAuthState = ({ user }: RootState) => user;

export { authReducer, logOut, selectAuthState };
