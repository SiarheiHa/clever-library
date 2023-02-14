import React from 'react';
import { Outlet } from 'react-router-dom';

import { Container } from '../container';
import { Footer } from '../footer';
import { Header } from '../header';

const Layout = () => (
  <React.Fragment>
    <Container>
      <Header />
    </Container>
    <Outlet />
    <Container>
      <Footer />
    </Container>
  </React.Fragment>
);

export { Layout };
