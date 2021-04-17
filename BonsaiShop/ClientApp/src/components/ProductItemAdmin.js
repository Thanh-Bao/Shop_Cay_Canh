import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class ProductItemAdmin extends Component {
    render() {
        return (
            <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td><Link to={`/product-detail/` + this.props.productID}>  <button type="button" className="btn-cart-product btn btn-outline-primary"><i className="fas fa-eye"></i>Xem chi tiết</button></Link></td>
            </tr>
        );
    }
}

export default ProductItemAdmin;