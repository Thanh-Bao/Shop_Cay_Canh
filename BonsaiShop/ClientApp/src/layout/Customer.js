import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBarCustomer';
import Footer from '../components/FooterCustomer';
import FilterBar from '../components/FilterBar';

class Customer extends Component {
    render() {
        return (
            <div>
                 <NavigationBar/>
                 <FilterBar/>
                {this.props.children}
                <Footer/>
            </div>
        );
    }
}

export default Customer;