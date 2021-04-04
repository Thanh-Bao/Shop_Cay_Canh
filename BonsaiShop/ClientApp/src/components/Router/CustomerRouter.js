import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import Home from '../Customer/Home';
import ProductDetail from '../Customer/ProductDetail';

class CustomerRouter extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/productDetail" component={ProductDetail} />
            </Switch>
        );
    }
}

export default CustomerRouter;