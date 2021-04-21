import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
// Layout
import AdminLayout from '../layout/Admin';
import CustomerLayout from '../layout/Customer';
// Customer
import Home from '../pages/customer/Home';
import ProductDetail from '../pages/customer/ProductDetail';
import Login from '../pages/customer/Login';
import OTPRegister from '../pages/customer/OTPRegister';
import Register from '../pages/customer/Register';
import Cart from '../pages/customer/Cart';
import Contact from '../pages/customer/Contact';
import Profile from '../pages/customer/Profile';
import Purchase from '../pages/customer/Purchase';
// Admin
import Orders from '../pages/admin/Orders';
import TransactionHistory from '../pages/admin/TransactionHistory';
import ProductsList from '../pages/admin/Products';
import AddProduct from '../pages/admin/AddProduct';
import Users from '../pages/admin/Users';
import Report from '../pages/admin/Reports';
import Revenue from '../pages/admin/Revenue';
import AdminLogin from '../pages/admin/AdminLogin';
import EditProduct from '../pages/admin/EditProduct';
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
                                <ProtectedRoute exact path="/admin/edit-product" component={EditProduct} isAuth={adminAuthen} />
                                <ProtectedRoute exact path="/admin/users" component={Users} isAuth={adminAuthen} />
                                <ProtectedRoute exact path="/admin/report" component={Report} isAuth={adminAuthen} />
                                <ProtectedRoute exact path="/admin/revenue" component={Revenue} isAuth={adminAuthen} />
                                <ProtectedRoute exact path="/admin/transaction-history" component={TransactionHistory} isAuth={adminAuthen} />
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
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/register" component={Register} />
                                <Route exact path="/otp-register" component={OTPRegister} />
                                <Route exact path="/profile" component={Profile} />
                                <Route exact path="/cart" component={Cart} />
                                <Route exact path="/purchase" component={Purchase} />
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