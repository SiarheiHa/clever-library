import { Outlet } from 'react-router-dom';

import { Loader } from '../loader';

const LayoutStart = () => (
  <div>
    LayoutStart
    <Outlet />
    <Loader />
  </div>
);

export { LayoutStart };
