import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormText, Label, Input, FormFeedback } from 'reactstrap';

class BlameModal extends Component {
    constructor (props) {
        super(props);
        this.state = {
            modal: false
        };
    }

    render () {
        const { modal, toggle, data } = this.props;
        log(this.props);
        return (
            <Modal isOpen={ modal }>
                <ModalHeader><strong>header</strong></ModalHeader>
                <ModalBody>
                    { data.content }
                    {/* <Form method="post" encType="multipart/form-data">
                        <Label for="bot-name"><code>*</code>봇 이름</Label>
                        <Input type="text" name="name" id="bot-name" value={name} onChange={ this.handleChange } valid={ validation } invalid={ !validation } />
                        <FormFeedback invalid={ !validation } valid={ validation }>{ validation ? '사용 가능한 이름입니다.' : '중복되었거나 빈 값입니다.' }</FormFeedback>
                        <Label for="bot-desc" className="custom-margin-vertical-none mt-3">봇 설명</Label>
                        <FormText className="custom-margin-vertical-none mb-1">어떤 역할을 하는 봇인가요?</FormText>
                        <Input type="textarea" name="description" id="bot-desc" value={ description } onChange={ this.handleChange } />
                        <Label for="bot-img" className="custom-margin-vertical-none mt-3 mb-1">대표 이미지</Label>
                        <Input type="file" name="image" id="bot-img" onChange={ this.handleChange }/>
                        <FormText color="muted">
                            봇의 대표 이미지를 지정해주세요. 미지정 시 기본 이미지가 표시됩니다.
                        </FormText>
                    </Form> */}
                </ModalBody>
                <ModalFooter className="border-top-none custom-text-align-center">
                    <Button color="secondary" className="modal-footer-btn" onClick={ toggle }>닫기</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default BlameModal;