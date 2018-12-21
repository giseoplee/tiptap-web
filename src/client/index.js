import './polyfill'
import './utils/functional';


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';

import { Provider } from 'react-redux';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers';
import saga from './saga';

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(
  routerMiddleware(history),
  sagaMiddleware
)
const store = createStore(reducers, middleware);
sagaMiddleware.run(saga);

ReactDOM.render(
    <Provider store={ store }>
        <App history={ history } />
    </Provider>, 
    document.getElementById('root')
);