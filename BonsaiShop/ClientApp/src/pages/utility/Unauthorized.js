import React, { Component } from 'react';

class Unauthorized extends Component {
    render() {
        return (
            <div style={{marginTop:-40}} className="container-fluid text-center">
                <img className="img-fluid" src="/401.png"></img>
            </div>
        );
    }
}

export default Unauthorized;