import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBlameList } from '../../reducers/blame';

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
            return false;
        }
    }

    render() {
        const { blameList } = this.state;
        const lastTdWidth = { width: '150px' };
        return (
          <div className="animated fadeIn">
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i> 신고된 사용자 목록
                        {/* { blameList ? log(blameList) : '뭐요' } */}
                  </CardHeader>
                  <CardBody>
                    <Table responsive>
                      <thead>
                      <tr>
                        <th>No. </th>
                        <th>API name</th>
                        <th>Description</th>
                        <th>Base Route</th>
                        <th>Status</th>
                        <th>Date registered</th>
                        <th></th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>1</td>
                        <td>GRS CHATBOT ANGEL</td>
                        <td>Description</td>
                        <td>/GRS/v1/</td>
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
                        <td>Description</td>
                        <td>/GRS/v2/</td>
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
                        <td>Description</td>
                        <td>/lmessage/rest/</td>
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
                        <td>Description</td>
                        <td>/insight/v1/</td>
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
    // log(state);
    return {
        blameList: state.blame.data
    };
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getBlameList: () => dispatch(getBlameList())
//     };
// };

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlameList));
export default withRouter(connect(mapStateToProps)(BlameList));
