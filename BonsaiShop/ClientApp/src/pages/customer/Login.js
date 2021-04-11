import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../../css/Login.css'

class Login extends Component {
    render() {
        return (
            <div>
                <div className="container-fluid ">
                    <div className="row no-gutter d-flex justify-content-center my-5 pb-5">
                        <div className="col-4">

                            <form>
                                <div className="text-center mb-5">
                                    <i style={{ fontSize: 80 }} className="far fa-user"></i>
                                </div>
                                <div className="form-label-group">
                                    <label htmlFor="inputEmail">Số điện thoại</label>
                                    <input type="text" className="form-control  boder-style" placeholder="09xxxxxxxx" required autofocus />
                                </div>
                                <div className="mt-2 form-label-group">
                                    <label htmlFor="inputPassword">Mật khẩu</label>
                                    <input type="password" className="form-control boder-style" placeholder="*********" required />
                                </div>
                                <div className="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                    <label className="mt-2 custom-control-label" htmlFor="customCheck1">Ghi nhớ đăng nhập</label>
                                </div>
                                <button className=" boder-style btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Đăng nhập</button>
                                <div className="text-center">
                                    <a href="#"> Quên mật khẩu?</a>
                                </div>
                                <div className="text-center my-3">
                                <span>Chưa có tài khoản? </span><Link to="/register" class="badge badge-pill badge-success"> Đăng kí ngay</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;