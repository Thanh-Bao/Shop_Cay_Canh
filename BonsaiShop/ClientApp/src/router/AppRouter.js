import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
// Layout
import AdminLayout from '../layout/Admin';
import CustomerLayout from '../layout/Customer';
// Customer
import Home from '../pages/customer/Home';
import ProductDetail from '../pages/customer/ProductDetail';
import OrderTracking from '../pages/customer/OrderTracking';
import Login from '../pages/customer/Login';
import Register from '../pages/customer/Register';
import Cart from '../pages/customer/Cart';
import Contact from '../pages/customer/Contact';
// Admin
import Orders from '../pages/admin/Orders';
import ProductsList from '../pages/admin/Products';
import AddProduct from '../pages/admin/AddProduct';
import Users from '../pages/admin/Users';
import Report from '../pages/admin/Reports';
import Revenue from '../pages/admin/Revenue';
import AdminLogin from '../pages/admin/AdminLogin';
//Utility
import PageNotFound from '../pages/utility/PageNotFound';
import ProtectedRoute from '../router/ProtectedRoute';
import Unauthorized from '../pages/utility/Unauthorized';
import ScrollToTop from '../pages/utility/ScrollToTop';




class AppRouter extends Component {
    render() {
        let adminAuthen = this.props.adminLogined;
        return (
            <Router>
                <ScrollToTop />
                <Switch>

                    <Route exact path="/admin/login" component={AdminLogin} />

                    <Route exact path="/admin/:path?">
                        <AdminLayout>
                            <Switch>
                                <ProtectedRoute exact path="/admin/" component={Orders} isAuth={adminAuthen} />
                                <ProtectedRoute exact path="/admin/orders" component={Orders} isAuth={adminAuthen} />
                                <ProtectedRoute exact path="/admin/products" component={ProductsList} isAuth={adminAuthen} />
                                <ProtectedRoute exact path="/admin/add-product" component={AddProduct} isAuth={adminAuthen} />
                                <ProtectedRoute exact path="/admin/users" component={Users} isAuth={adminAuthen} />
                                <ProtectedRoute exact path="/admin/report" component={Report} isAuth={adminAuthen} />
                                <ProtectedRoute exact path="/admin/revenue" component={Revenue} isAuth={adminAuthen} />
                                <Route path="*" component={PageNotFound} />
                            </Switch>
                        </AdminLayout>
                    </Route>

                    <Route>
                        <CustomerLayout>
                            <Switch>
                                <Route exact path="/unauthorized" component={Unauthorized} />
                                <Route exact path="/" component={Home} />
                                <Route exact path="/home" component={Home} />
                                <Route exact path="/order-tracking" component={OrderTracking} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/register" component={Register} />
                                <Route exact path="/cart" component={Cart} />
                                <Route exact path="/contact" component={Contact} />
                                <Route exact path="/product-detail/:path?" component={ProductDetail} />
                                <Route path="*" component={PageNotFound} />
                            </Switch>
                        </CustomerLayout>
                    </Route>

                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = state => ({
    adminLogined: state.adminLogined
});
export default connect(mapStateToProps)(AppRouter);