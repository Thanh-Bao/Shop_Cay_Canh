import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import TextTruncate from 'react-text-truncate';

class ProductItemAdmin extends Component {

    EditProduct(id) {
        localStorage.setItem("LASTED_EDDIT_PRODUCT_ID", id)
    }


    render() {
        var numeral = require('numeral');
        var striptags = require('striptags');
        return (
            <tr>
                <td><img src={this.props.thumbnail} width={50} height={50} /></td>
                <td>{this.props.name}</td>
                <td className="text-danger">{numeral(this.props.price).format('0,0')}</td>
                <td >{numeral(this.props.quantity).format('0,0')}</td>
                <td>{this.props.height}</td>
                <td>{this.props.origin}</td>
                <td
                    className="text-truncate"
                    style={{ maxWidth: 100 }}
                    data-toggle="tooltip" data-placement="top" title={striptags(this.props.description)}
                >
                    {striptags(this.props.description)}
                </td>
                <td><Link to="/admin/edit-product">  <button onClick={() => this.EditProduct(this.props.productID)} type="button" className="btn-cart-product btn btn-warning"><i className="fas fa-edit"></i> Chỉnh sửa</button></Link></td>
                <td><a target="_blank" href={`/product-detail/` + this.props.productID}>  <button type="button" className="btn-cart-product btn btn-outline-primary"><i className="fas fa-eye"></i> Xem full</button></a></td>
            </tr>
        );
    }
}

export default ProductItemAdmin;