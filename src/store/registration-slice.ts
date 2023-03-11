import { createSlice } from '@reduxjs/toolkit';

import { RegistrationState } from '../types/types';

import { registerUser } from './actions';
import { RootState } from './store';

const initialState: RegistrationState = {
  loading: false,
  userInfo: null, // for user object
  error: null,
  success: false, // for monitoring the registration process.
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      console.log(action);
      state.loading = false;
      state.success = true;
      state.error = null;
      state.userInfo = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      console.log(action);
      state.loading = false;
      state.success = false;
      state.error = action.payload || 1;
    });
  },
});

const registrationReducer = registrationSlice.reducer;
const selectRegistration = ({ registration }: RootState) => registration;

export { registrationReducer, selectRegistration };
