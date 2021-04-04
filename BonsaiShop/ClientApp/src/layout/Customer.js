import React, { Component } from 'react';

class Customer extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default Customer;