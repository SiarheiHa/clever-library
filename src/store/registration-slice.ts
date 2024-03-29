import { createSlice } from '@reduxjs/toolkit';

import { UserState } from '../types/types';

import { registerUser } from './actions';
import { RootState } from './store';

const initialState: UserState = {
  loading: false,
  userInfo: null,
  error: null,
  success: false,
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    resetRegistrationState(state) {
      state.error = null;
      state.loading = false;
      state.success = false;
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.userInfo = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload || 1;
    });
  },
});

const { resetRegistrationState } = registrationSlice.actions;
const registrationReducer = registrationSlice.reducer;
const selectRegistration = ({ registration }: RootState) => registration;

export { registrationReducer, resetRegistrationState, selectRegistration };
