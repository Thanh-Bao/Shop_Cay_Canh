import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBarCustomer';
import Footer from '../components/FooterCustomer';

class Customer extends Component {
    render() {
        return (
            <div>
                 <NavigationBar/>
                {this.props.children}
                <Footer/>
            </div>
        );
    }
}

export default Customer;