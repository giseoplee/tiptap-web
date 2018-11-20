import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authorize, clearAuthorize } from '../../reducers/auth';

class Login extends Component {

  constructor (props) {
    super(props);
    this.state = {
        login: '',
        password: '',
        status: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loginFailAlert = this.loginFailAlert.bind(this);
  };

  handleChange(value, index) {
    this.setState({ [index]: value });
  }

  handleKeyPress(e) {
    if(e.charCode === 13){
      e.preventDefault();
      this.onSubmit();
    }
  }

  loginFailAlert (msg) {
    alert(msg);
  }

  onSubmit () {
    const { login, password } = this.state;
    this.props.dispatch(authorize(login, password));
  }

  shouldComponentUpdate (nextProps, prevState) {
    // log(nextProps.status);
    // log(prevState.status);
    if (nextProps.status !== prevState.status) {
      switch (nextProps.status) {
        case true : {
          return this.props.history.push('/blame/list');
        }
        case 'Invalid User' : {
          this.loginFailAlert(nextProps.status);
          this.props.dispatch(clearAuthorize());
          break;
        }
        default : {
          this.loginFailAlert(nextProps.error || 'Unkown Error');
          this.props.dispatch(clearAuthorize());
        }
      }
    } else {
      return false;
    }
  }

  render() {
    log(this.props);
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Account" onChange={ e => this.handleChange(e.target.value, 'login') } />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" onChange={ e => this.handleChange(e.target.value, 'password') } onKeyPress={ this.handleKeyPress } />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={ () => this.onSubmit() }>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                {/* <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Button color="primary" className="mt-3" active>Register Now!</Button>
                    </div>
                  </CardBody>
                </Card> */}
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      status: state.auth.status
  };
};

export default withRouter(connect(mapStateToProps)(Login));