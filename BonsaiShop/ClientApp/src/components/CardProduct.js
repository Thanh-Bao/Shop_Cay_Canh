import React, { Component } from 'react';
import TextTruncate from 'react-text-truncate';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class CardProduct extends Component {

    handleEditorChange = (content, editor) => {
        console.log('Content was updated:', content);
    }

    render() {
        var numeral = require('numeral');
        return (
            <div className="card h-100">
                <Link className="card-images-change wraper-fixed-img container-img-overlay" to={`/productdetail/`+this.props.productID}>
                    <img className="card-img-top img-item-fixed" src={this.props.thumbnail} alt="Front" />
                    <img className="card-img-top img-top-change img-item-fixed" src={this.props.fullImage} alt="Back" />
                    <span className="bottom-left-img-overlay mr-2 badge badge-pill badge-primary d-inline">Cao: {this.props.height} cm</span>
                    <span className="bottom-right-img-overlay mr-2 badge badge-pill badge-info d-inline">Xuất xứ: {this.props.origin}</span>
                </Link>
                <div className="card-body">
                    <div className="text-center">
                        <h3 className="card-title font-weight-bold text-truncate">
                            <Link className="text-decoration-none" to={`/productdetail/`+this.props.productID}>{this.props.name}</Link>
                        </h3>
                        <h3 className=" font-weight-bold text-danger" >{numeral(this.props.price).format('0,0')} đ
                        </h3>
                    </div>
                    <hr />
                    
                     <TextTruncate
                        line={3}
                        element="p"
                        truncateText=" …"
                        containerClassName=" d-inline card-text text-card-description"
                        text={this.props.description}
                    />

                    <div className="d-flex mt-2 justify-content-between">
                        <button type="button" className="btn-cart-product btn btn-outline-primary"><i className="fas fa-eye"></i>Xem chi tiết</button>
                        <button type="button" className="btn-cart-product btn btn-primary"><i className="fas fa-cart-plus"></i> Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CardProduct;