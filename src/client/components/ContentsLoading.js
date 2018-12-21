import React, { Component } from 'react';
import { Col } from 'reactstrap';

class ContentLoading extends Component {
    render () {
        return (
            <Col className="text-center font-secondary vertical-margin-auto-3">  
                <p className="content-spinner">
                    <i className="fa fa-spinner fa-spin custom-font-3rem mt-4 mb-1"></i>
                </p>
                <p className="content-spinner">
                    <strong>로딩 중 . . .<br /></strong>
                </p>
            </Col>
        );
    }
}

export default ContentLoading;