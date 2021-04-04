import React, { Component } from 'react';

class Admin extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default Admin;