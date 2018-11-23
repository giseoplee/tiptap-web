import React, { Component } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/ldcc_logo.png'
import sygnet from '../../assets/img/lotte_logo.png'
import adminIcon from '../../assets/img/avatars/user.png';

import { destroyAuthorize, sessionCheck, resetRedirect } from '../../reducers/auth';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class Header extends Component {
  constructor (props) {
    super(props);
    this.state = {
      status: 'init'
    };
    this.logout = this.logout.bind(this);
  };

  logout() {
    this.props.dispatch(destroyAuthorize());
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (prevState.status === 'init' && nextProps.status === false) {
      return { status: 'check' };
    } else {
      return null;
    }
  }

  shouldComponentUpdate (nextProps) {
    if (nextProps.redirect) {
      this.props.dispatch(resetRedirect());
      this.props.history.push('/login');
      return false;
    } else {
      return false;
    }
  }

  render() {
    const { children, ...attributes } = this.props;
    if (this.state.status === 'check') this.props.dispatch(sessionCheck());
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 115, height: 29, alt: 'TipTap-Admin' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'TipTap' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={adminIcon} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem onClick={ () => this.logout() }><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
      status: state.auth.status,
      redirect: state.auth.redirect
  };
};

export default withRouter(connect(mapStateToProps)(Header));
