import React from 'react';
import Loadable from 'react-loadable'

import Layout from './containers/Layout';

function Loading() {
  return <p className="page-spinner">
          <i className="fa fa-spinner fa-spin custom-font-3rem mt-4 mb-1"></i>
        </p>;
}

const BlameBoard = Loadable({
  loader: () => import('./views/Contents/Blame'),
  loading: Loading
});

const BlockBoard = Loadable({
  loader: () => import('./views/Contents/Block'),
  loading: Loading
});

const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading: Loading
});

const routes = [
  { path: '/', exact: true, name: 'Home', component: Layout },
  { path: '/login', name: 'Login', component: Login },
  { path: '/blame/list', name: '신고 사용자 관리', component: BlameBoard },
  { path: '/block/list', name: '차단 사용자 관리', component: BlockBoard }
];

export default routes;
