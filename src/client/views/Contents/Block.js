import React, { Component, Fragment } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Alert } from 'reactstrap';
import Pagination from "react-js-pagination";
import confirm from 'reactstrap-confirm';
import { toast } from 'react-toastify';
import moment from 'moment';

import BlameModal from '../../components/BlameModal';
import ContentsLoading from '../../components/ContentsLoading';
import './Blame.css';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBlockList } from '../../reducers/block';
import { updateUserStatus, resetUpdateUserStatus } from '../../reducers/user';

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

class BlockList extends Component {

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

  openBlameContentModal (diary, writer, type) {
    this.setState({
      modal: !this.state.modal,
      modalData: { diary: diary, writer: writer, type: type }
    });
  }

  toggle () {
    this.setState({
      modal: !this.state.modal
    });
  }

  blockAccountConfirm (object) {
    return confirm({
      title: (
          <Fragment>
              <strong>사용자 계정 활성화</strong>
          </Fragment>
      ),
      message: `정말로 [${object.reportedUser.name}] 사용자의 계정을 활성화하시겠습니까?`,
      cancelText: "아니요",
      confirmText: "예",
      confirmColor: "primary",
      cancelColor: "danger"
    }).then(result => result
      ? this.props.dispatch(updateUserStatus({ 
        id: object.id, 
        status: 1, 
        target_user_id: object.reportedUser.id, 
        target_user_token: object.reportedUser.token, 
        content_id: 
        object.content_id }))
      : undefined
    );
  }

  handleSelected (index) {
    this.props.dispatch(getBlockList({ page: index }));
  }

  componentDidMount () {
    this.props.dispatch(getBlockList());
  }

  shouldComponentUpdate (nextProps, prevState) {
    if (nextProps.updateStatus !== prevState.updateStatus) {
      switch (nextProps.updateStatus) {
        case 'WAITING': {
          return false;
        }
        case 'SUCCESS': {
          return go(
            resetUpdateUserStatus(),
            this.props.dispatch,
            _ => toast.info("사용자 계정 활성화를 완료하였습니다.", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2500
            }),
            _ => this.props.dispatch(getBlockList({ page: nextProps.currentPage })),
            _ => false
          );
        }
        default : {
          return true;
        }
      }
    } else {
      return false;
    }
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
                <td>
                  <Button size="sm" className="margin-left-20" outline color="info" data={ obj.diary } onClick={ _ => this.openBlameContentModal(obj.diary, obj.reportedUser.name, convertType(obj.type)) }>
                    내용 확인
                  </Button>
                </td>
                <td>{ obj.reportedUser.name }</td>
                <td>{ convertType(obj.type) }</td>
                <td>{ moment(obj.reportedUser.updatedAt).format(`YYYY년 MM월 DD일 HH시 mm분`) }</td>
                <td>{ `${ Math.floor(moment.duration(moment().diff(moment(obj.reportedUser.updatedAt))).asDays()) }일` }</td>
                <td>
                  <Button size="sm" className="margin-left-8" outline color="primary" onClick={ _ => this.blockAccountConfirm(obj) }>계정 활성화</Button>
                </td>
              </tr>
            , data));
    };

    const { status, blockList, totalItems, pageSize, currentPage } = this.props;
    return (
      <div>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> 정지된 사용자 목록
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <TableHeaderRow data={ ['No. ', '정지 컨텐츠', '이름', '사유', '정지 날짜', '현재 정지 일수',  '-'] } />
                  <tbody>
                    {
                      (status => {
                        switch (status) {
                          case 'WAITING' : {
                            return <tr>
                              <td colSpan="12">
                                  <ContentsLoading />
                              </td>
                            </tr>;
                          }
                          case 'SUCCESS' : {
                            {
                              return blockList.length > 0 
                              ? <TableBodyRows data={ blockList } /> 
                              : <tr>
                                  <td colSpan="12" className="custom-text-align-center"> 
                                    <Alert className="custom-margin-bottom-0" color="danger">
                                      정지된 사용자가 존재하지 않습니다!
                                    </Alert>
                                  </td>
                                </tr>;
                            }
                          }
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
      status: state.block.status,
      blockList: state.block.list,
      totalItems: state.block.totalItems,
      pageSize: state.block.pageSize,
      currentPage: state.block.currentPage,
      updateStatus: state.user.status
  };
};

export default withRouter(connect(mapStateToProps)(BlockList));
