import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { hideLoader, selectUserState, showLoader, useAppDispatch, useAppSelector } from '../../store';
import { Container } from '../container';
import { Footer } from '../footer';
import { Header } from '../header';
import { Loader } from '../loader';
import { Toast } from '../toast';

const Layout = () => {
  const navigate = useNavigate();
  const { userInfo } = useAppSelector(selectUserState);
  // const jwt = userInfo?.jwt;
  const jwt = true;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  if (pathname === '/') {
    navigate('/books/all');
  }

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
    if (!jwt) {
      navigate('/auth');
    }
    if (pathname === '/') {
      navigate('/books/all');
    }
  }, [jwt, navigate, pathname]);

  if (!jwt) {
    navigate('/auth');

    return null;
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
