import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button, Alert } from 'reactstrap';
import PaginationComponent from 'react-reactstrap-pagination';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBlameList } from '../../reducers/blame';

const TableHeaderRow = props => {
  const { data } = props;
  return (
    <thead>
      <tr> 
        { map(v => <th key={v}>{v}</th>, data) }
      </tr>
    </thead>
  );
};

const TableBodyRows = props => {
  const { data } = props;
  const convertType = type => {
    switch (type) {
      case 'etc': return '기타';
      case 'porn': return '음란물';
      case 'ad': return '광고';
      default : return '기타';
    }
  };

  return (
    <tbody>
      { map(obj => 
        <tr key= { obj.id }>
          <td>{ obj.id }</td>
          <td>{ obj.reporterUser.name }</td>
          <td>
            <Button size="sm" className="margin-left-20" outline color="info" data={ obj.diary }>
              Open
            </Button>
          </td>
          <td>{ obj.reportedUser.name }</td>
          <td>{ convertType(obj.type) }</td>
          <td>
            <Button size="sm" className="margin-left-8" outline color="danger">계정 차단</Button>
          </td>
        </tr>
      , data)}
    </tbody>
  );
};

class BlameList extends Component {

  constructor (props) {
      super(props);
      this.state = {
          visible: true
      }
      this.handleSelected = this.handleSelected.bind(this);
  }

  handleSelected(index) {
    log(index);
  }

  componentDidMount() {
      this.props.dispatch(getBlameList());
  }

  render() {
      const { blameList, totalItems, pageSize } = this.props;
      log(totalItems);
      log(pageSize);
      return (
        <div className="animated fadeIn">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> 신고된 사용자 목록
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <TableHeaderRow data={ ['No. ', '신고자', '컨텐츠', '신고대상자', '사유', '차단'] } />
                    <TableBodyRows data={ blameList } />
                  </Table>
                  <Row col="12">
                    <Col xs="4"></Col>
                    <Col xs="4">
                      <PaginationComponent totalItems={totalItems} pageSize={pageSize} onSelect={ this.handleSelected } />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      );
  }
};

const mapStateToProps = state => {
  return {
      blameList: state.blame.list,
      totalItems: state.blame.totalItems,
      pageSize: state.blame.pageSize
  };
};

export default withRouter(connect(mapStateToProps)(BlameList));