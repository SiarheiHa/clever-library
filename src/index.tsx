import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/layout';
import { LayoutMainPage } from './components/layout-main-page';
import { Terms } from './components/terms';
import { BookPage } from './pages/book';
import { MainPage } from './pages/main';
import { store } from './store';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route element={<LayoutMainPage />}>
              <Route index={true} element={<Navigate to='/books/all' />} />
              <Route path='/books/all' element={<MainPage />} />
              <Route path='/books/:category' element={<MainPage />} />
              <Route path='/terms' element={<Terms content='terms' />} />
              <Route path='/contract' element={<Terms content='contract' />} />
            </Route>
            <Route path='books/:category/:bookId' element={<BookPage />} />
          </Route>
        </Routes>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
