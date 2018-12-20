import React, { Component, Fragment } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';
import Pagination from "react-js-pagination";
import confirm from 'reactstrap-confirm';


import BlameModal from '../../components/BlameModal';
import ContentsLoading from '../../components/ContentsLoading';
import './Blame.css';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBlameList } from '../../reducers/blame';

const TableHeaderRow = props => {
  const { data } = props;
  return (
    <thead>
      <tr className="custom-text-align-center">
        { map(v => <th key={v}>{v}</th>, data) }
      </tr>
    </thead>
  );
};

class BlameList extends Component {

  constructor (props) {
      super(props);
      this.state = {
        modal: false,
        modalData: {}
      }

      this.handleSelected = this.handleSelected.bind(this);
      this.openBlameContentModal = this.openBlameContentModal.bind(this);
      this.blockAccountConfirm = this.blockAccountConfirm.bind(this);
      this.toggle = this.toggle.bind(this);
  }

  openBlameContentModal (diary) {
    log(diary);
    this.setState({
      modal: !this.state.modal,
      modalData: diary
    });
  }

  toggle () {
    this.setState({
      modal: !this.state.modal
    });
  }

  blockAccountConfirm () {
    return confirm({
      title: (
          <Fragment>
              <strong>사용자 차단</strong>
          </Fragment>
      ),
      message: "해당 사용자 계정을 차단하시겠습니까?",
      cancelText: "취소",
      confirmText: "차단",
      confirmColor: "primary",
      cancelColor: "danger"
    }).then(result => {
      log(result);
    });
  }

  handleSelected (index) {
    this.props.dispatch(getBlameList({ page: index }));
  }

  componentDidMount () {
    this.props.dispatch(getBlameList());
  }

  render() {
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
    
      return (map(obj =>
              <tr key= { obj.id } className="custom-text-align-center">
                <td>{ obj.id }</td>
                <td>{ obj.reporterUser.name }</td>
                <td>
                  <Button size="sm" className="margin-left-20" outline color="info" data={ obj.diary } onClick={ _ => this.openBlameContentModal(obj.diary) }>
                    Open
                  </Button>
                </td>
                <td>{ obj.reportedUser.name }</td>
                <td>{ convertType(obj.type) }</td>
                <td>
                  <Button size="sm" className="margin-left-8" outline color="danger" onClick={ _ => this.blockAccountConfirm() }>계정 차단</Button>
                </td>
              </tr>
            , data));
    };

    const { status, blameList, totalItems, pageSize, currentPage } = this.props;
    return (
      <div>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> 신고된 사용자 목록
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <TableHeaderRow data={ ['No. ', '신고자', '컨텐츠', '신고대상자', '사유', '차단'] } />
                  <tbody>
                    {
                      (status => {
                        if (status === 'WAITING') {
                          return <tr>
                              <td colSpan="12">
                                  <ContentsLoading />
                              </td>
                            </tr>
                        } else {
                          return <TableBodyRows data={ blameList } />
                        }
                      })(status)
                    }
                  </tbody>
                </Table>
                <Row col="12">
                  <Col xs="4"></Col>
                  <Col xs="4" className="custom-text-align-center">
                      <Pagination
                          activePage={ currentPage }
                          itemsCountPerPage={ pageSize }
                          totalItemsCount={ totalItems }
                          pageRangeDisplayed={ 5 }
                          onChange={ this.handleSelected }
                        />
                  </Col>
                </Row>
                <BlameModal modal={ this.state.modal } toggle={ this.toggle } data={ this.state.modalData } />
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
      status: state.blame.status,
      blameList: state.blame.list,
      totalItems: state.blame.totalItems,
      pageSize: state.blame.pageSize,
      currentPage: state.blame.currentPage
  };
};

export default withRouter(connect(mapStateToProps)(BlameList));
