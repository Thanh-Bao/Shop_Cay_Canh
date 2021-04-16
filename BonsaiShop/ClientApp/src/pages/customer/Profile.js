import React, { Component } from 'react';
import QRCode from "react-qr-code";
import { Redirect } from 'react-router-dom'

class Profile extends Component {

    logOut() {
        localStorage.clear();
        window.location.reload(true);
    }

    render() {

        let redirectHome;

        if (localStorage.getItem("PHONEUSERLOGINED") === null) {
            redirectHome = (
                <Redirect to='/' />
            )
        }

        return (
            <div>
                {redirectHome}
                <div className="container">
                    <div className="row my-4">
                        <div className="col-12 d-flex justify-content-start">
                            <button onClick={() => { this.logOut() }} type="button" class="btn btn-danger"><i className="fas fa-sign-out-alt"></i> Đăng xuất</button>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className='row justify-content-center text-center'>

                        <h3>Danh sách đơn hàng đã đặt</h3>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Ngày</th>
                                    <th scope="col">Mã đơn hàng</th>
                                    <th scope="col">Trạng Thái</th>
                                    <th scope="col">Hình thức thanh toán</th>
                                    <th scope="col">Địa chỉ</th>
                                    <th scope="col">Tổng tiền</th>
                                    <th scope="col">Xem chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>

            </div>
        );
    }
}

export default Profile;