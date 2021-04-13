import React, { Component } from 'react';
import CartItem from '../../components/CartItem';
import CallAPI from '../../callAPI/callAPIMainServer';
import ImageHolder from '../../components/Loading';
import '../../css/Cart.css';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listItem: null
    }
  }


  componentDidMount() {
    let userPhone = localStorage.getItem("PHONEUSERLOGINED");
    CallAPI(`Cart/${userPhone}`).then(res => {
      console.log(res.data);
      this.setState({
        listItem: res.data
      })
    }).catch(() => {
      console.log("LỖI LẤY DANH SÁCH GIỎ HÀNG");
    })
  }

  render() {
    var numeral = require('numeral');

    let showItems;
    if ((this.state.listItem != null)) {
      showItems = this.state.listItem.map(product => {
        return (
          <CartItem
            productID={product.productID}
            thumbnail={product.thumbnail}
            name={product.name}
            price={product.price}
            quantity={product.quantity}
          />)
      })
    }
    return (
      <div>
        {(this.state.listItem != null) ?
          (<div>
            <div className="container-fluid my-5 mx-3">
              <div className="row">
                <div className=" col-lg-8 col-sm-12 col-md-12" >
                  <table className="table">

                    <tbody>
                      {showItems}
                      {showItems}
                      {showItems}
                      {showItems}
                      {showItems}
                      {showItems}
                      {showItems}
                      {showItems}
                      {showItems}
                      {showItems}
                      {showItems}
                      {showItems}
                      {showItems}
                      {showItems}
                      {showItems}
                      {showItems}
                    </tbody>
                  </table>
                </div>
                <div className=" col-lg-4 col-sm-12 col-md-12 text-center">
                  <div className="mx-5 card sticky-top" >
                    <div className="card-body">
                      <h5 className="card-title">Thành tiền: </h5>
                      <table className="table ">
                        <thead>
                          <tr>
                            <th scope="col">Tạm tính:</th>
                            <td ><h5 className="font-weight-bold text-danger">{numeral(10000000000).format('0,0')} đ</h5></td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">Phí Ship:</th>
                            <td ><h5 className="font-weight-bold text-danger">{numeral(0).format('0,0')} đ</h5></td>

                          </tr>
                          <tr>
                            <th scope="row">Tổng Tiền:</th>
                            <td ><h5 className="font-weight-bold text-danger">{numeral(10000000000).format('0,0')} đ</h5></td>

                          </tr>

                        </tbody>
                      </table>
                      <a href="#" className="btn btn-lg btn-primary"><i className="fas fa-money-check-alt"></i> Thanh toán</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>)
          : (
            <div className="text-center my-5 py-5">
              <ImageHolder url="/emptycart.png" />
              <h1 className="mb-5 pb-5">Giỏ hàng trống</h1>
            </div>
          )}
      </div>

    );
  }
}

export default Cart;