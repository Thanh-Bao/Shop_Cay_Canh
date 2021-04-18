import React, { Component } from 'react';
import QRCode from "react-qr-code";
import { Redirect } from 'react-router-dom';
import CallAPI from '../../callAPI/callAPIMainServer';
import OrderRecord from '../../components/CustomerOrderRecord';
import Pagination from "react-js-pagination";
import unixTimeToDate from '../utility/UnixTimeToDate'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOrder: null,
            totalItem: 0,
            pageSize: 0,
            activePage: 1
        }
    }

    logOut() {
        localStorage.clear();
        window.location.reload(true);
    }


    componentDidMount() {
        let userPhone = localStorage.getItem("PHONEUSERLOGINED");
        CallAPI(`Orders/${userPhone}`)
            .then(res => {
                this.setState({
                    listOrder: res.data.list,
                    pageSize: res.data.pageSize,
                    totalItem: res.data.totalItem
                })
            })
            .catch(() => {
                console.log("Lỗi lấy danh sách đơn hàng");
            })
    }

    handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
        let userPhone = localStorage.getItem("PHONEUSERLOGINED");
        CallAPI(`Orders/${userPhone}`, null, { page: pageNumber })
            .then(res => {
                console.log(res.data)
                this.setState({
                    listOrder: res.data.list,
                    pageSize: res.data.pageSize,
                    totalItem: res.data.totalItem
                })
            })
            .catch(() => {
                alert("Lỗi lấy danh sách đơn hàng");
            })
    }

    render() {

        let redirectHome;

        if (localStorage.getItem("PHONEUSERLOGINED") === null) {
            redirectHome = (
                <Redirect to='/' />
            )
        }

        let showListOrder;
        if (this.state.listOrder != null) {
            showListOrder = this.state.listOrder.map(order => {
                return (
                    <OrderRecord
                        key={order.orderId}
                        date={unixTimeToDate(order.timestamp)}
                        orderID={order.orderId}
                        status={order.status}
                        paymentMethod={order.paymentMethod === "COD" ? "COD" : "Chuyển khoản"}
                        Address={order.address}
                        totalMoney={order.totalMoney}
                        ViewDetail={order.orderId}
                    />
                )
            })
        }

        return (
            <div>
                {redirectHome}
                <div className="container">
                    <div className="row my-4">
                        <div className="col-12 d-flex justify-content-start">
                            <button onClick={() => { this.logOut() }} type="button" className="btn btn-danger"><i className="fas fa-sign-out-alt"></i> Đăng xuất</button>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className='row justify-content-center text-center'>

                        <h3>Danh sách đơn hàng đã đặt</h3>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Ngày</th>
                                    <th scope="col">Mã đơn hàng</th>
                                    <th scope="col">Trạng Thái</th>
                                    <th scope="col">Hình thức thanh toán</th>
                                    <th scope="col">Địa chỉ</th>
                                    <th scope="col">Tổng tiền</th>
                                    <th scope="col">Xem chi tiết</th>
                                    <th scope="col">hủy đơn hàng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showListOrder}
                            </tbody>
                        </table>
                        <span></span>
                        <Pagination
                            activePage={this.state.activePage}
                            firstPageText="trang đầu"
                            lastPageText="trang cuối"
                            itemClass="page-item"
                            linkClass="page-link"
                            itemsCountPerPage={this.state.pageSize}
                            totalItemsCount={this.state.totalItem}
                            pageRangeDisplayed={parseInt(process.env.REACT_APP_PAGE_RANGE_DISPLAYED)}
                            onChange={this.handlePageChange.bind(this)}
                        />
                    </div>
                </div>
                <p className="mb-5 pb-5"></p>

            </div>
        );
    }
}

export default Profile;