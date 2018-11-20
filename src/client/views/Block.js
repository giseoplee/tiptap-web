import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBlameList } from '../reducers/blame';

class BlameList extends Component {

    constructor (props) {
        super(props);
        this.state = {
            blameList: []
        }
    }

    componentDidMount() {
        this.props.dispatch(getBlameList());
    }

    static getDerivedStateFromProps (nextProps, prevState) {
        if (nextProps.blameList.data !== prevState.blameList) {
            return { blameList: nextProps.blameList };
        } else {
            return null;
        }
    }

    // shouldComponentUpdate (nextProps, prevState) {
    //   log(nextProps);
    //   log(prevState);
    // }

    render() {
        const { blameList } = this.state;
        const lastTdWidth = { width: '150px' };
        return (
          <div className="animated fadeIn">
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i> 차단된 사용자 목록
                  </CardHeader>
                  <CardBody>
                    <Table responsive>
                      <thead>
                      <tr>
                        <th>No. </th>
                        <th>이름</th>
                        <th>사유</th>
                        <th>차단 원인 컨텐츠</th>
                        <th>상태</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>1</td>
                        <td>GRS CHATBOT ANGEL</td>
                        <td>
                          <Badge color="success">Published</Badge>
                        </td>
                        <td>2012-01-01</td>
                        <td style={lastTdWidth}>
                          <Button size="sm" className="margin-left-20" outline color="info">Edit</Button>
                          <Button size="sm" className="margin-left-8" outline color="danger">Delete</Button>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>GRS CHATBOT RIA</td>
                        <td>
                          <Badge color="warning">Created</Badge>
                        </td>
                        <td>2012-01-01</td>
                        <td style={lastTdWidth}>
                          <Button size="sm" className="margin-left-20" outline color="info">Edit</Button>
                          <Button size="sm" className="margin-left-8" outline color="danger">Delete</Button>
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>L-MESSAGE REST API</td>
                        <td>
                          <Badge color="warning">Created</Badge>
                        </td>
                        <td>2012-01-01</td>
                        <td style={lastTdWidth}>
                          <Button size="sm" className="margin-left-20" outline color="info">Edit</Button>
                          <Button size="sm" className="margin-left-8" outline color="danger">Delete</Button>
                        </td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>INSIGHT REST API</td>
                        <td>
                          <Badge color="warning">Created</Badge>
                        </td>
                        <td>2012-01-01</td>
                        <td style={lastTdWidth}>
                          <Button size="sm" className="margin-left-20" outline color="info">Edit</Button>
                          <Button size="sm" className="margin-left-8" outline color="danger">Delete</Button>
                        </td>
                      </tr>
                      </tbody>
                    </Table>
                    <Row col="12">
                      <Col xs="4"></Col>
                      <Col xs="4">
                      <Pagination listClassName="justify-content-center">
                        <PaginationItem>
                          <PaginationLink previous tag="button"></PaginationLink>
                        </PaginationItem>
                        <PaginationItem active>
                          <PaginationLink tag="button">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink tag="button">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink tag="button">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink tag="button">4</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink next tag="button"></PaginationLink>
                        </PaginationItem>
                      </Pagination>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        blameList: state.blame.data
    };
};

export default withRouter(connect(mapStateToProps)(BlameList));
