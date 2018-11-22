import React from 'react';
import Loadable from 'react-loadable'
import Loader from 'react-loader-spinner'

import Layout from './containers/Layout';

function Loading() {
  return <Loader type="Rings" color="#dc3545" height="100"	width="100" className="custom-center"/>;
}

const BlameBoard = Loadable({
  loader: () => import('./views/Contents/Blame'),
  loading: Loading,
});

const BlockBoard = Loadable({
  loader: () => import('./views/Contents/Block'),
  loading: Loading,
});

const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading: Loading,
});

const routes = [
  { path: '/', exact: true, name: 'Home', component: Layout },
  { path: '/login', name: 'Login', component: Login },
  { path: '/blame/list', name: 'Blame', component: BlameBoard },
  { path: '/block/list', name: 'Block', component: BlockBoard }
];

export default routes;
