import React, { Component } from 'react';

class ImageHolder extends Component {
    render() {
        return (
            <div className="container-fluid text-center">
                <img className="img-fluid" alt="hahah" src={this.props.url}></img>
            </div>
        );
    }
}

export default ImageHolder;