import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { hideLoader, selectAuthState, showLoader, useAppDispatch, useAppSelector } from '../../store';
import { Container } from '../container';
import { Footer } from '../footer';
import { Header } from '../header';
import { Loader } from '../loader';
import { Toast } from '../toast';

const Layout = () => {
  const navigate = useNavigate();
  const { userAuthData } = useAppSelector(selectAuthState);
  const uid = userAuthData?.uid;
  // const uid = true;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const isSomeQueryPending = useAppSelector(
    (state) =>
      Object.values(state.api.queries).some((query) => query?.status === 'pending') ||
      Object.values(state.api.mutations).some((mutation) => mutation?.status === 'pending')
  );

  useEffect(() => {
    // console.log(isSomeQueryPending);
    if (isSomeQueryPending) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [dispatch, isSomeQueryPending]);

  useEffect(() => {
    if (!uid) {
      navigate('/auth');
    }
    if (pathname === '/') {
      navigate('/books/all');
    }
  }, [uid, navigate, pathname]);

  if (!uid) {
    navigate('/auth');

    return null;
  }

  if (pathname === '/') {
    navigate('/books/all');
  }

  return (
    <React.Fragment>
      <Toast />
      <Container>
        <Header />
      </Container>
      <Outlet />
      <Container>
        <Footer />
      </Container>
      <Loader />
    </React.Fragment>
  );
};

export { Layout };
