import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Card, CardImg, CardBody, CardText } from 'reactstrap';
import noImage from '../assets/img/no_image.png';
import moment from 'moment';

class BlameModal extends Component {
    constructor (props) {
        super(props);
        this.state = {
            modal: false
        };
    }

    render () {
        const { modal, toggle, data } = this.props;
        const { diary, writer, type } = data;
        const closeButton = <button className="close" onClick={ toggle }>&times;</button>;

        return (
            <Modal isOpen={ modal }>
                <ModalHeader toggle={ toggle } close={ closeButton }>
                    <strong>신고된 컨텐츠 내용</strong>
                </ModalHeader>
                <ModalBody>
                    <Card>
                        <CardImg top width="100%" src={ (_ => { if (diary) return !!diary.imageUrl ? diary.imageUrl : noImage })() } alt="Card image cap" />
                        <CardBody>
                            <CardText>
                                { !!diary ? diary.content : undefined }
                            </CardText>
                            <CardText>
                                <div>
                                    <small className="text-muted">
                                        작성자 : { writer }
                                    </small>
                                </div>
                                <div>
                                    <small className="text-muted">
                                        작성 시간 : { !!diary ? moment(diary.createdAt).format(`YYYY년 MM월 DD일 HH시 mm분`) : undefined } 
                                    </small>
                                </div>
                                <div>
                                    <small className="text-muted">
                                        신고 사유 : { type } 
                                    </small>
                                </div>
                            </CardText>
                        </CardBody>
                    </Card>
                </ModalBody>
                <ModalFooter className="border-top-none custom-text-align-center">
                    <Button color="secondary" className="modal-footer-btn" onClick={ toggle }>닫기</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default BlameModal;