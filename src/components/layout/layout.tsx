import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { hideLoader, selectUserState, showLoader, useAppDispatch, useAppSelector } from '../../store';
import { Container } from '../container';
import { Footer } from '../footer';
import { Header } from '../header';
import { Loader } from '../loader';
import { Toast } from '../toast';

const Layout = () => {
  const navigate = useNavigate();
  const { userInfo } = useAppSelector(selectUserState);
  const jwt = userInfo?.jwt;
  const dispatch = useAppDispatch();

  const isSomeQueryPending = useAppSelector(
    (state) =>
      Object.values(state.api.queries).some((query) => query?.status === 'pending') ||
      Object.values(state.api.mutations).some((mutation) => mutation?.status === 'pending')
  );

  useEffect(() => {
    console.log(isSomeQueryPending);
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
  }, [jwt, navigate]);
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
