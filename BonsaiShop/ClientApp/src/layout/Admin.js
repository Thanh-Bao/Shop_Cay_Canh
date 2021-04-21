import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import $ from 'jquery';


class Admin extends Component {

    componentDidMount() {
        $("#menu-toggle").click(function (e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });
    }

    render() {
        return (
            <div>
                <div className="d-flex" id="wrapper">
                    {/* Sidebar */}
                    <div className="bg-light border-right" id="sidebar-wrapper">
                        <div className="sidebar-heading"> Danh mục quản lý </div>
                        <div className="list-group list-group-flush">
                            <NavLink to="/admin/orders" className="list-group-item list-group-item-action"><i className="fas fa-file-invoice-dollar"></i> <span className="font-weight-bold">Đơn hàng</span></NavLink>
                            <NavLink to="/admin/products" className="list-group-item list-group-item-action"><i className="fas fa-boxes"></i> <span className="font-weight-bold">Danh sách sản phẩn</span></NavLink>
                            <NavLink to="/admin/add-product" className="list-group-item list-group-item-action"><i className="fas fa-tree"></i> <span className="font-weight-bold">Thêm sản phẩm</span></NavLink>
                            <NavLink to="/admin/users" className="list-group-item list-group-item-action"><i className="fas fa-user-circle"></i> <span className="font-weight-bold">Tài khoản</span></NavLink>
                            <NavLink to="/admin/report" className="list-group-item list-group-item-action"><i className="fas fa-envelope-open-text"></i> <span className="font-weight-bold">Phản hồi</span></NavLink>
                            <NavLink to="/admin/revenue" className="list-group-item list-group-item-action"><i className="fas fa-hand-holding-usd"></i> <span className="font-weight-bold">Chi tiết doanh thu</span></NavLink>
                            <NavLink to="/admin/transaction-history" className="list-group-item list-group-item-action"><i className="fas fa-comment-dollar"></i> <span className="font-weight-bold">Dòng tiền</span></NavLink>
                        </div>
                    </div>
                    {/* /#sidebar-wrapper */}
                    {/* Page Content */}
                    <div id="page-content-wrapper">

                        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                            <button className="btn btn-primary" id="menu-toggle"><i className="fas fa-bars"></i> Menu</button>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" />
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                {/* <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                                    <li className="nav-item active">
                                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Link</a>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Dropdown
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                            <a className="dropdown-item" href="#">Action</a>
                                            <a className="dropdown-item" href="#">Another action</a>
                                            <div className="dropdown-divider" />
                                            <a className="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </li>
                                </ul> */}
                            </div>

                        </nav>
                        <div className="container-fluid">


                            {/* MAIN CONTENT */}
                            {this.props.children}
                            {/* MAIN CONTENT */}


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Admin;