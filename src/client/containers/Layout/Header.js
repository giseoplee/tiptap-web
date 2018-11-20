import React, { Component } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/ldcc_logo.png'
import sygnet from '../../assets/img/lotte_logo.png'
import avatar9 from '../../assets/img/avatars/2.jpg';

import { clearAuthorize } from '../../reducers/auth';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class Header extends Component {
  constructor (props) {
    super(props);
    this.logout = this.logout.bind(this);
  };

  logout() {
    this.props.dispatch(clearAuthorize());
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    if (!this.props.status) this.props.history.push('/login');
    /**
     * props 방식은 새로고침 시 문제 발생
     * 내일 쿠키 굽기 고고 / 여기서 제어가능 할듯
     * TTL = maxAge 설정 / 라우터에서 검증하는 로직 구현
     * 검증 실패시 빠꾸 시켜버림 강제로
     */
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
              <img src={avatar9} className="img-avatar" alt="admin@bootstrapmaster.com" />
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
      status: state.auth.status
  };
};

export default withRouter(connect(mapStateToProps)(Header));
