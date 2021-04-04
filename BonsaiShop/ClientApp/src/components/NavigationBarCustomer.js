import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

class NavigationBarCustomer extends Component {
    render() {
        return (
            <div>
                <nav className=" navbar fixed-top navbar-expand-lg navbar-light" id="CustomerNavigationBar">
                    <div className="container-fluid d-flex justify-content-between">
                        <NavLink className="navbar-brand" to="/home">
                            <img src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width={30} height={24} />
                        </NavLink>
                        <button className="navbar-toggler mb-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <form className="d-flex ms-auto">
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addonNavCustomer"><i class="fas fa-search"></i></span>
                                    <input type="text" className="form-control" placeholder="Bạn tìm gì?" aria-label="Username" aria-describedby="basic-addonNavCustomer" />
                                </div>
                                <button className="btn btn-outline-success ms-2" type="submit">Tìm</button>
                            </form>
                            <ul id="ListMenuItemNav" className="nav nav-pills nav-fill ms-auto mb-2 mb-lg-0 ">
                                <li className="nav-item">
                                    <NavLink activeClassName="NavItemActive" className="nav-link NavItem" to="/home"><i class="fas fa-home"></i> Trang Chủ</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName="NavItemActive" className="nav-link NavItem" to="/orderTracking"><i class="fas fa-box"></i> Xem đơn hàng</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName="NavItemActive" className="nav-link NavItem" to="/login"><i class="fas fa-key"></i> Đăng nhập</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName="NavItemActive" className="nav-link NavItem" to="/register"><i class="fas fa-user-plus"></i> Đăng Kí</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName="NavItemActive" className="nav-link NavItem" to="/cart"><i class="fas fa-shopping-cart"></i> Giỏ hàng</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName="NavItemActive" className="nav-link NavItem" to="/contact"><i class="fas fa-shopping-cart"></i> Liên hệ</NavLink>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>
                <div id="navigationBarSpacingBottom"></div>
            </div>
        );
    }
}

export default NavigationBarCustomer;