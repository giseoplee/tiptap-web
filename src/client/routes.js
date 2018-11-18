import React from 'react';
import Loadable from 'react-loadable'

import Layout from './containers/Layout';


function Loading() {
  return <div>Loading...</div>;
}

const ApiRoutesBoard = Loadable({
  loader: () => import('./views/Blame/List'),
  loading: Loading,
});

const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading: Loading,
});

const routes = [
  { path: '/', exact: true, name: 'Home', component: Layout },
  { path: '/login', name: 'Login', component: Login },
  { path: '/blame/list', name: 'Blame', component: ApiRoutesBoard },
];

export default routes;
