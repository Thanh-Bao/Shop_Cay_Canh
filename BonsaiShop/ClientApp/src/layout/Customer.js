import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBarCustomer';

class Customer extends Component {
    render() {
        return (
            <div>
                 <NavigationBar/>
                {this.props.children}
            </div>
        );
    }
}

export default Customer;