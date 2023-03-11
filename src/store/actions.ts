import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { BASE_URL } from '../constants';
import { RegistrationFormData, ServerError, UserInfo } from '../types/types';

const registerUser = createAsyncThunk<UserInfo, RegistrationFormData, { rejectValue: 1 | 400 }>(
  'registaration/register',
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const resp: AxiosResponse<UserInfo> = await axios.post(`${BASE_URL}/api/auth/local/register`, data, config);

      if (resp.status === 200) {
        return resp.data;
      }

      return resp.data;
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === 400) {
        return rejectWithValue(err.response.status);
      }

      console.log(err);

      return rejectWithValue(1);
    }
  }
);

export { registerUser };
