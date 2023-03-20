import { createSlice } from '@reduxjs/toolkit';

import { UserState } from '../types/types';

import { auth } from './actions';
import { RootState } from './store';

const initialState: UserState = {
  loading: false,
  userInfo: {
    user: null,
    jwt: localStorage.getItem('jwt'),
  },
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserState(state) {
      console.log('reset');
      state.error = null;
      state.loading = false;
      state.success = false;
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(auth.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(auth.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.success = true;
      state.error = null;
      state.userInfo = action.payload;
    });
    builder.addCase(auth.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload || 1;
    });
  },
});

const { resetUserState } = userSlice.actions;
const userReducer = userSlice.reducer;
const selectUserState = ({ user }: RootState) => user;

export { userReducer, resetUserState, selectUserState };
