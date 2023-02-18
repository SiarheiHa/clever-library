import React from 'react';
import { Outlet } from 'react-router-dom';

import { Container } from '../container';
import { Footer } from '../footer';
import { Header } from '../header';
import { Loader } from '../loader';
import { Toast } from '../toast';

const Layout = () => (
  <React.Fragment>
    <Toast />
    <Container>
      <Header />
    </Container>
    <Outlet />
    <Container>
      <Footer />
    </Container>
    {/* <Loader /> */}
  </React.Fragment>
);

export { Layout };
