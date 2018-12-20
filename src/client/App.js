import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import '@coreui/icons/css/coreui-icons.min.css';
import 'flag-icon-css/css/flag-icon.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import './scss/style.css';
import './scss/custom.css';

import { Layout } from './containers';
import { Login, Page404, Page500, Register } from './views/Pages';

class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route exact path="/login" name="Login Page" component={ Login } />
            <Route exact path="/register" name="Register Page" component={ Register } />
            <Route exact path="/404" name="Page 404" component={ Page404 } />
            <Route exact path="/500" name="Page 500" component={ Page500 } />
            <Route path="/" name="Home" component={ Layout } />
          </Switch>
      </Router>
    );
  }
}

export default App;
