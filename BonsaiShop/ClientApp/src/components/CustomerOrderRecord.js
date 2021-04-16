import React, { Component } from 'react';

class CustomerOrderRecord extends Component {


    render() {
        var numeral = require('numeral');
        let orderStatusLbl;
        switch (this.props.status) {
            case "Pending":
                orderStatusLbl = (
                    <span className="badge badge-pill badge-secondary">Chờ xác nhận</span>
                );
                case "Shipping":
                orderStatusLbl = (
                    <span className="badge badge-pill badge-primary">đang vận chuyển</span>
                );
                case "finish":
                orderStatusLbl = (
                    <span className="badge badge-pill badge-success">Đã nhận hàng</span>
                );
                case "Cancel":
                orderStatusLbl = (
                    <span className="badge badge-pill badge-danger">Đã hủy</span>
                );
                break;
            default:
                orderStatusLbl = this.props.status;
                break;
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
                <td className="text-danger">{numeral(this.props.totalMoney).format('0,0')} đ</td>
                <td><button type="button" className="btn btn-info"><i className="fas fa-info-circle"></i> {this.props.ViewDetail}</button></td>
            </tr>
        );
    }
}

export default CustomerOrderRecord;