import React, { Component } from 'react';
import TextTruncate from 'react-text-truncate';

class CartProduct extends Component {
    render() {
        var numeral = require('numeral');
        return (
            <div className="card h-100">
                <a className="card-images-change wraper-fixed-img" href="#">
                    <img className="card-img-top img-item-fixed" src={this.props.thumbnail} alt="Front" />
                    <img className="card-img-top img-top-change img-item-fixed" src={this.props.fullImage} alt="Back" />
                </a>
                <div className="card-body">
                    <div className="text-center">
                        <h3 className="card-title font-weight-bold text-truncate">
                            <a className="text-decoration-none" href="#">Project Three </a>
                        </h3>
                        <h3 className=" font-weight-bold text-danger" >{numeral(800000).format('0,0')} đ
                        </h3>
                    </div>

                    <hr />
                    <TextTruncate
                        line={3}
                        element="p"
                        truncateText=" …"
                        containerClassName="card-text text-card-description"
                        text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos quisquam, error quod sed cumque, odio distinctio velit nostrum temporibus necessitatibus et facere atque iure perspiciatis mollitia recusandae vero vel quam!"
                    />

                    <div class="d-flex justify-content-between">
                        <button type="button" class="btn-cart-product btn btn-outline-primary"><i class="fas fa-eye"></i>Xem chi tiết</button>
                        <button type="button" class="btn-cart-product btn btn-primary"><i class="fas fa-cart-plus"></i> Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CartProduct;