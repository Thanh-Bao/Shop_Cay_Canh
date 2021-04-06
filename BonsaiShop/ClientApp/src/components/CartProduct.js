import React, { Component } from 'react';
import TextTruncate from 'react-text-truncate';

class CartProduct extends Component {
    render() {
        var numeral = require('numeral');
        return (
            <div className="card h-100">
                <a className="card-images-change wraper-fixed-img" href="/ghdsdf">
                    <img className="card-img-top img-item-fixed" src={this.props.thumbnail} alt="Front" />
                    <img className="card-img-top img-top-change img-item-fixed" src={this.props.fullImage} alt="Back" />
                </a>
                <div className="card-body">
                    <div className="text-center">
                        <h3 className="card-title font-weight-bold text-truncate">
                            <a className="text-decoration-none" href="/fsffs">{this.props.name}</a>
                        </h3>
                        <h3 className=" font-weight-bold text-danger" >{numeral(this.props.price).format('0,0')} đ
                        </h3>
                    </div>
                    <hr />
                    <span class="mr-2 badge badge-pill badge-info d-inline">Cao: {this.props.height} cm</span>
                     <TextTruncate
                        line={3}
                        element="p"
                        truncateText=" …"
                        containerClassName=" d-inline card-text text-card-description"
                        text={this.props.description}
                    />

                    <div className="d-flex mt-2 justify-content-between">
                        <button type="button" className="btn-cart-product btn btn-outline-primary"><i className="fas fa-eye"></i>Xem chi tiết</button>
                        <button type="button" className="btn-cart-product btn btn-warning"><i className="fas fa-cart-plus"></i> Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CartProduct;