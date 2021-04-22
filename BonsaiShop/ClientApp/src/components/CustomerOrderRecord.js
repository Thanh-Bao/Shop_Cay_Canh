import React, { Component } from 'react';
import CallAPI from '../callAPI/callAPIMainServer';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class CustomerOrderRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProduct: null,
            orderID: this.props.orderID
        }
    }


    getOrderDetail() {
        CallAPI('Orders/orderdetail', null, { orderId: this.state.orderID }).then(res => {
            this.setState({
                listProduct: res.data
            })
        }).catch(() => {
            alert("Lỗi lấy chi tiết đơn hàng")
        })
    }


    cancelOrder() {
        if (window.confirm("Bạn chắc chắn hủy đơn hàng này")) {
            CallAPI('Orders/cancel-order', 'POST', { orderId: this.state.orderID }).then(res => {
                if (res.data) {
                    window.location.reload();
                } else {
                    alert("Không thể hủy đơn hàng tại thời điểm này")
                }

            }).catch(() => {
                alert("Lỗi hủy đơn hàng")
            })
        }
    }


    render() {
        var numeral = require('numeral');
        let orderStatusLbl;
        switch (this.props.status) {
            case "Pending":
                orderStatusLbl = (
                    <span className="badge badge-pill badge-secondary">Chờ xác nhận</span>
                );
                break;
            case "Shipping":
                orderStatusLbl = (
                    <span className="badge badge-pill badge-primary">đang vận chuyển</span>
                );
                break;
            case "Finish":
                orderStatusLbl = (
                    <span className="badge badge-pill badge-success">Đã nhận hàng</span>
                );
                break;
            case "Cancel":
                orderStatusLbl = (
                    <span className="badge badge-pill badge-danger">Đã hủy</span>
                );
                break;
            default:
                orderStatusLbl = this.props.status;
                break;
        }

        let showOrderDetail;
        let productRecord;
        if (this.state.listProduct === null) {
            showOrderDetail = ".........loading.......";
        } else {

            productRecord = this.state.listProduct.map(product => {
                return (

                    <tr>
                        <th scope="row"><a href={`/product-detail/` + product.productId}><img width={50} height={50} src={product.thumbnail} /></a></th>
                        <th ><a href={`/product-detail/` + product.productId}>{product.productName}</a></th>
                        <td>{numeral(product.productPrice).format('0,0')} đ</td>
                        <td>{product.quantity}</td>
                        <td className="text-danger">{numeral(product.totalMoney).format('0,0')} đ</td>
                    </tr>
                )
            });
            showOrderDetail = (<table className="table">
                <thead>
                    <tr>
                        <th colSpan="2" scope="col">Tên</th>
                        <th scope="col">Đơn giá</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Tổng tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {productRecord}
                </tbody>
            </table>);
        }

        return (
            <tr>
                <th scope="row">{this.props.date}</th>
                <td>#{this.props.orderID}</td>
                <td>{orderStatusLbl}</td>
                <td>{this.props.paymentMethod}</td>
                <td>
                    <span className="d-inline-block text-truncate" style={{ width: 100 }}
                        data-toggle="tooltip" data-placement="top" title={this.props.Address}
                    >
                        {this.props.Address}
                    </span>
                </td>
                <td >{numeral(this.props.totalMoney).format('0,0')} đ</td>
                {/* <td><button type="button" className="btn btn-info"><i className="fas fa-info-circle"></i> {this.props.ViewDetail}</button></td> */}

                <td>

                    <div>
                        {/* Button trigger modal */}
                        <button onClick={() => this.getOrderDetail()} type="button" className="btn btn-info" data-toggle="modal" data-target={`#viewDetailList${this.props.orderID}`}>
                            <i className="fas fa-info-circle"></i> DS sản phẩm
                        </button>
                        {/* Modal */}
                        <div className="modal fade" id={`viewDetailList${this.props.orderID}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">st
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Chi tiết đơn hàng #{this.props.orderID}</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span className="text-danger" aria-hidden="true"><i className=" fas fa-times-circle"></i></span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        {showOrderDetail}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </td>

                <td>
                    {(this.props.status === 'Cancel') ? <button disabled type="button" className="btn btn-danger" >
                        <i className="fa fa-trash-alt"></i> Hủy
                        </button> : <button onClick={() => this.cancelOrder()} type="button" className="btn btn-danger" >
                        <i className="fa fa-trash-alt"></i> Hủy
                        </button>}
                </td>

            </tr>
        );
    }
}

export default CustomerOrderRecord;