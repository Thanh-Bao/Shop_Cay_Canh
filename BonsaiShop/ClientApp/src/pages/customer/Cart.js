import React, { Component } from 'react';

class Cart extends Component {
  
  render() {
    var numeral = require('numeral');
    return (
      <div>
        <div className="container-fluid my-5 mx-3">
          <div className="row">
            <div className=" col-lg-8 col-sm-12 col-md-12" >
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark </td>
                    <td>Otto</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className=" col-lg-4 col-sm-12 col-md-12 text-center">
              <div className="mx-5 card"  >
                <div className="card-body">
                  <h5 className="card-title">Thành tiền: </h5>
                  <table class="table ">
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
      </div>
    );
  }
}

export default Cart;