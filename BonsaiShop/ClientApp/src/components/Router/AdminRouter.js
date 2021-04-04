import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import Dashboard from '../Admin/Dashboard';
import UserManagement from '../Admin/UsersManagement';
import ProtectedRoute from './ProtectedRoute';
import NoMatch from '../Utility/PageNotFound';

class AdminRouter extends Component {
    render() {
        return (
            <Switch>
                <ProtectedRoute  path="/quantri/trangchu" component={Dashboard} isAuth={true} />
                <ProtectedRoute  path="/quantri/quanlynguoidung" component={UserManagement} isAuth={false} />
                <Route exact component={NoMatch} />
            </Switch>
        );
    }
}

export default AdminRouter;