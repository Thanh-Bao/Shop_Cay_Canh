import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import CustomerRouter from './components/Router/CustomerRouter';
import AdminRouter from './components/Router/AdminRouter'
import Unauthorized from './components/Utility/Unauthorized';



class App extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/KhongCoQuyenTruyCap" component={Unauthorized} />
                <CustomerRouter />
                <AdminRouter />
            </Router>
        );
    }
}
const mapStateToProps = state => ({
    kkk: state.abc
})
export default connect(mapStateToProps)(App);