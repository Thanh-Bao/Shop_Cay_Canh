import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CallAPI from '../../callAPI/callAPIMainServer';
import OrderRecord from '../../components/AdminOrderRecord';
import Pagination from "react-js-pagination";
import unixTimeToDate from '../utility/UnixTimeToDate'

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOrder: null,
            totalItem: 0,
            pageSize: 0,
            activePage: 1
        }
    }

    componentDidMount() {
        let userPhone = localStorage.getItem("PHONEUSERLOGINED");
        CallAPI(`Orders/all`)
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
        CallAPI(`Orders/all`, null, { page: pageNumber })
            .then(res => {
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
                        phone={order.phone}
                        name={order.name}
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

                <div className="container-fluid">
                    <div className='row justify-content-center text-center'>

                        <h3>Danh sách đơn hàng đã đặt</h3>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Ngày</th>
                                    <th scope="col">Mã đơn hàng</th>
                                    <th scope="col">SĐT</th>
                                    <th scope="col">Tên</th>
                                    <th scope="col">Trạng Thái</th>
                                    <th scope="col">Hình thức</th>
                                    <th scope="col">Địa chỉ</th>
                                    <th scope="col">Tổng tiền</th>
                                    <th scope="col">Xem chi tiết</th>
                                    <th scope="col">Đổi trạng thái</th>
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

export default Orders;