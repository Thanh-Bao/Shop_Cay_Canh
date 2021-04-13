import React, { Component } from 'react';

class CartItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: this.props.quantity,
            productID : this.props.productID
        }
    }
    render() {
        var numeral = require('numeral');
        return (
            <tr>
                <td className="row">
                    <img src={this.props.thumbnail} width={100} alt="fdf" />
                    <strong className="ml-5 fw-bold">{this.props.name}</strong>
                </td>
                <td><span className="ml-5">Đơn giá: <strong className=" text-danger">{numeral(this.props.price).format('0,0')}đ</strong> </span></td>
                <td><h1 className="ml-5">{this.state.quantity} xxxx {this.props.productID}</h1></td>
            </tr>
        );
    }
}

export default CartItem;