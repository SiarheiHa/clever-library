import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

import { db, firebaseAuth } from '../api/firebase';
import { BASE_URL } from '../constants';
import {
  AuthFormData,
  EmailFormData,
  RegistrationFormData,
  ResetPassFormData,
  UserDetail,
  UserInfo,
} from '../types/types';

const registerUser = createAsyncThunk<void, RegistrationFormData, { rejectValue: 1 | 400 }>(
  'registration/register',
  // eslint-disable-next-line consistent-return
  async (data, { rejectWithValue }) => {
    try {
      // Регистрация пользователя с использованием Firebase Authentication
      const response = await createUserWithEmailAndPassword(firebaseAuth, data.email, data.password);

      // Создание объекта пользователя
      const userDetail: UserDetail = {
        id: response.user.uid,
        username: data.username,
        email: data.email,
        confirmed: true,
        blocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        role: null,
        comments: null,
        avatar: null,
        booking: null,
        delivery: null,
        history: null,
      };

      // Определяем путь к месту, где нужно сохранить данные пользователя
      const userDetailRef = ref(db, `userDetails/${userDetail.id}`);

      // Сохраняем объект userDetail в базе данных
      await set(userDetailRef, userDetail);
    } catch (error) {
      const firebaseError: FirebaseError = error as FirebaseError;
      // eslint-disable-next-line no-underscore-dangle
      const code = (firebaseError.customData?._tokenResponse as { error?: { code: number } })?.error?.code;

      if (code === 400) {
        return rejectWithValue(400);
      }

      // Возвращаем ошибку с использованием rejectWithValue
      return rejectWithValue(1);
    }
  }
);

const auth = createAsyncThunk<UserInfo, AuthFormData, { rejectValue: 1 | 400 }>(
  'user/auth',
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const resp: AxiosResponse<UserInfo> = await axios.post(`${BASE_URL}/api/auth/local`, data, config);

      if (resp.status === 200 && resp.data.jwt) {
        localStorage.setItem('jwt', resp.data.jwt);

        return resp.data;
      }

      return resp.data;
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === 400) {
        return rejectWithValue(err.response.status);
      }

      return rejectWithValue(1);
    }
  }
);

const requestRefreshLink = createAsyncThunk<{ ok: boolean }, EmailFormData, { rejectValue: string }>(
  'forgot/refresh',
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const resp: AxiosResponse<{ ok: boolean }> = await axios.post(
        `${BASE_URL}/api/auth/forgot-password`,
        data,
        config
      );

      if (resp.data.ok === true) {
        return resp.data;
      }

      return resp.data;
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === 500) {
        return rejectWithValue('error');
      }

      return rejectWithValue('error');
    }
  }
);

const resetPass = createAsyncThunk<UserInfo, ResetPassFormData & { code: string }, { rejectValue: 1 | 400 }>(
  'pass/reset',
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const resp: AxiosResponse<UserInfo> = await axios.post(`${BASE_URL}/api/auth/reset-password`, data, config);

      if (resp.status === 200) {
        return resp.data;
      }

      return resp.data;
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === 400) {
        return rejectWithValue(err.response.status);
      }

      return rejectWithValue(1);
    }
  }
);

export { registerUser, auth, requestRefreshLink, resetPass };
