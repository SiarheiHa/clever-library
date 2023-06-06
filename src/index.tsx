import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

// eslint-disable-next-line import/no-extraneous-dependencies
// import { initializeApp } from 'firebase/app';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { getDatabase, onValue, ref } from 'firebase/database';
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

// const firebaseConfig = {
//   apiKey: 'AIzaSyDkqVHxlh4tsQKqoXiMueA4_tGkylbW2Xk',
//   authDomain: 'library-7a4ac.firebaseapp.com',
//   databaseURL: 'https://library-7a4ac-default-rtdb.europe-west1.firebasedatabase.app',
//   projectId: 'library-7a4ac',
//   storageBucket: 'library-7a4ac.appspot.com',
//   messagingSenderId: '348777418437',
//   appId: '1:348777418437:web:09a64a98b80495fbee6aac',
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
// const database = getDatabase(app);

// console.log(database);

// const db = getDatabase(app);
// const starCountRef = ref(db, 'categories/');

// onValue(starCountRef, (snapshot) => {
//   const data = snapshot.val();

//   console.log(data);
// });

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
