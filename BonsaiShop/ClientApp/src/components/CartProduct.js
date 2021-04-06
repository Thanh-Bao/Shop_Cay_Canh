import React, { Component } from 'react';

class CartProduct extends Component {
    render() {
        return (
            <div className="card h-100">
                <a className="card-images-change wraper-fixed-img" href="#">
                    <img className="card-img-top img-item-fixed" src={this.props.thumbnail} alt="Front" />
                    <img className="card-img-top img-top-change img-item-fixed" src={this.props.fullImage} alt="Back" />
                </a>
                <div className="card-body">
                    <h4 className="card-title">
                        <a href="#">Project Three</a>
                    </h4>
                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos quisquam, error quod sed cumque, odio distinctio velit nostrum temporibus necessitatibus et facere atque iure perspiciatis mollitia recusandae vero vel quam!</p>
                </div>
            </div>
        );
    }
}

export default CartProduct;