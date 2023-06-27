import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/layout';
import { LayoutMainPage } from './components/layout-main-page';
import { LayoutStart } from './components/layout-start';
import { Terms } from './components/terms';
import { AuthPage } from './pages/auth';
import { BookPage } from './pages/book';
import { ForgotPassPage } from './pages/forgot-pass';
import { MainPage } from './pages/main';
import { ProfilePage } from './pages/profile';
import { RegistrationPage } from './pages/registration';
import { store } from './store';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <Routes>
          <Route element={<LayoutStart />}>
            {/* <Route index={true} element={<Navigate to='/auth' />} /> */}
            <Route path='/auth' element={<AuthPage />} />
            <Route path='/registration' element={<RegistrationPage />} />
            <Route path='/forgot-pass' element={<ForgotPassPage />} />
          </Route>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<LayoutMainPage />}>
              <Route path='/books/all' element={<MainPage />} />
              <Route path='/books/:category' element={<MainPage />} />
              <Route path='/terms' element={<Terms content='terms' />} />
              <Route path='/contract' element={<Terms content='contract' />} />
            </Route>
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='books/:category/:bookId' element={<BookPage />} />
          </Route>
        </Routes>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
