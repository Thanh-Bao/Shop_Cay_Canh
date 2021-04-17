import React, { Component } from 'react';
import '../css/ItemCart.css';
import CallAPI from '../callAPI/callAPIMainServer';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class CartItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: this.props.quantity,
            productID: this.props.productID
        };
    }

    handleClick(productID, minus) {
        let userPhone = localStorage.getItem("PHONEUSERLOGINED");
        if (minus) {
            if (this.state.quantity > 1) {
                this.setState({
                    quantity: this.state.quantity - 1
                })
                CallAPI(`Cart/${userPhone}`, 'PATCH', { productID: productID }).catch(() => {
                    alert("Lỗi Thêm sản phẩm vảo giỏ hàng");
                })
            }
        } else {
            this.setState({
                quantity: this.state.quantity + 1
            })
            CallAPI(`Cart/${userPhone}`, 'PUT', { productID: productID }).catch(() => {
                alert("Lỗi Thêm sản phẩm vảo giỏ hàng");
            })
        }

        CallAPI(`Cart/count/${userPhone}`).then(
            res => {
                this.props.dispatch({ type: "UPDATE_TOTAL_ITEM_CART", data: res.data });
                localStorage.setItem("TOTAL_ITEM_CART",res.data.count);
                localStorage.setItem("SUM_CART",res.data.sum);
            }).catch(() => {
                alert("Lỗi lấy tổng sản phẩm giỏ hàng");
            })


    }


    deleteItem(productID) {
        let userPhone = localStorage.getItem("PHONEUSERLOGINED");
        CallAPI(`Cart/${userPhone}`, 'DELETE', { productID: productID }).catch(() => {
            alert("Lỗi Xóa sản phẩm");
        });

        CallAPI(`Cart/count/${userPhone}`).then(
            res => {
                this.props.dispatch({ type: "UPDATE_TOTAL_ITEM_CART", data: res.data.count });
                localStorage.setItem("TOTAL_ITEM_CART",res.data.count);
                localStorage.setItem("SUM_CART",res.data.sum);
            }).catch(() => {
                alert("Lỗi lấy tổng sản phẩm giỏ hàng");
            });

            window.location.reload();
    }


    render() {
        var numeral = require('numeral');
        return (
            <tr>
                <td className="row">
                    <img src={this.props.thumbnail} width={100} height={100} alt="fdf" />
                    <strong className="ml-5 fw-bold">{this.props.name}</strong>
                </td>
                <td><span className="ml-5">Đơn giá: <strong className=" text-danger">{numeral(this.props.price).format('0,0')}đ</strong> </span> X </td>
                <td>
                    <div className="row">
                        <button onClick={() => this.handleClick(this.props.productID, true)} name="minus" id="MinusItemCart" type="button" className="btn btn-light"><i className="fas fa-minus"></i></button>
                        <input size={1}
                            min={1}
                            max={9999}
                            value={this.state.quantity} disabled
                            className="fw-bold" />
                        <button onClick={() => this.handleClick(this.props.productID, false)} name="plus" id="PlusItemCart" type="button" className="btn btn-light"><i className="fas fa-plus"></i></button>
                    </div>
                </td>
                <td className=" text-danger">
                    =  {numeral(this.props.price * this.state.quantity).format('0,0')} đ
                </td>
                <td>
                    <button onClick={() => this.deleteItem(this.props.productID)} type="button" className=" ml-5 btn btn-secondary"><i className="fas fa-trash-alt"></i> xóa</button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => ({
});
export default connect(mapStateToProps)(CartItem);