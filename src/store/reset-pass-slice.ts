import { createSlice } from '@reduxjs/toolkit';

import { UserState } from '../types/types';
import { resetPass } from './actions';

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

const resetPassSlice = createSlice({
  name: 'pass',
  initialState,
  reducers: {
    resetPassState(state) {
      state.error = null;
      state.loading = false;
      state.success = false;
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetPass.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(resetPass.fulfilled, (state, action) => {
      console.log(action);
      state.loading = false;
      state.success = true;
      state.error = null;
      state.userInfo = action.payload;
    });
    builder.addCase(resetPass.rejected, (state, action) => {
      console.log(action);
      state.loading = false;
      state.success = false;
      state.error = action.payload || 1;
    });
  },
});

const { resetPassState } = resetPassSlice.actions;
const passReducer = resetPassSlice.reducer;
const selectPassState = ({ pass }: RootState) => pass;

export { passReducer, resetPassState, selectPassState };
