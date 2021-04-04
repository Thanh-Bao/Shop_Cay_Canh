import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Layout
import AdminLayout from '../layout/Admin';
import CustomerLayout from '../layout/Customer';
// Customer
import Home from '../pages/customer/Home';
import ProductDetail from '../pages/customer/ProductDetail';
// Admin
import Dashboard from '../pages/admin/Dashboard';
import UsesManagement from '../pages/admin/UsersManagement';
//Utility
import PageNotFound from '../pages/utility/PageNotFound';
import ProtectedRoute from '../router/ProtectedRoute';
import Unauthorized from '../pages/utility/Unauthorized';


class AppRouter extends Component {
    render() {
        return (
            <Router>
                <Switch>

                    <Route exact path="/unauthorized" component={Unauthorized} />

                    <Route exact path="/admin/:path?">
                        <AdminLayout>
                            <Switch>
                                <ProtectedRoute exact path="/admin" component={Dashboard} isAuth={false} />
                                <ProtectedRoute exact path="/admin/users" component={UsesManagement} isAuth={true}/>
                                <Route path="*" component={PageNotFound} />
                            </Switch>
                        </AdminLayout>
                    </Route>

                    <Route>
                        <CustomerLayout>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/productdetail" component={ProductDetail} />
                                <Route path="*" component={PageNotFound} />
                            </Switch>
                        </CustomerLayout>
                    </Route>             

                </Switch>
            </Router>
        );
    }
}

export default AppRouter;