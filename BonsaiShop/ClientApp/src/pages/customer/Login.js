import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../css/Login.css'
import callAPi from '../../callAPI/callAPIMainServer';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            password: "",
            rememberLogin: false,
            loginfailed: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleInputChange(event) {

        localStorage.removeItem("FOCUS_LOGIN_TO_BUY");

        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name;

        this.setState({
            [name]: value,
            loginfailed: false
        });
    }


    handleSubmit(event) {
        event.preventDefault();
        let body = {
            phone: this.state.phone,
            password: this.state.password,
        }
        callAPi('Users/login', 'POST', { rememberLogin: this.state.rememberLogin }, body).then(res => {
            localStorage.setItem("token", res.data.token);
            alert("Đăng nhập thành công");
            if (res.data.name === " ") {
                localStorage.setItem("customerName", res.data.phone);
                this.props.dispatch({ type: "UPDATE_CUSTOMER_WELCOME", data: res.data.phone });
            } else {
                localStorage.setItem("customerName", res.data.name);
                this.props.dispatch({ type: "UPDATE_CUSTOMER_WELCOME", data: res.data.name });
            }
            localStorage.setItem("PHONEUSERLOGINED", res.data.phone);
            this.props.history.push('/home')
        }).catch(
            err => {
                this.setState({
                    loginfailed: true
                })
            }
        )
    }


    render() {
        localStorage.removeItem("userRegister");
        let loginFailedMessage;
        let showFocusLoginToBuy;

        if (localStorage.getItem("FOCUS_LOGIN_TO_BUY")) {
            showFocusLoginToBuy = (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong><i className="fas fa-exclamation-triangle"></i></strong> Bạn vui lòng đăng nhập để tiếp tục! 
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
            );
        }


        if (this.state.loginfailed) {
            loginFailedMessage = (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong><i className="fas fa-exclamation-triangle"></i></strong> Số điện thoại hoặc mật khẩu không đúng! Vui lòng kiểm tra lại.
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
            );
        }
        return (
            <div>
                <div className="container-fluid ">
                    <div className="row no-gutter d-flex justify-content-center my-5 pb-5">
                        <div className="col-4">
                            <form onSubmit={this.handleSubmit}>
                                <div className="text-center mb-5">
                                    <i style={{ fontSize: 80 }} className="far fa-user"></i>
                                </div>
                                {showFocusLoginToBuy}
                                {loginFailedMessage}

                                <div className="form-label-group">
                                    <label htmlFor="inputEmail">Số điện thoại</label>
                                    <input
                                        min={0}
                                        max={9999999999}
                                        name="phone"
                                        onChange={this.handleInputChange}
                                        type="number" className="form-control  boder-style" placeholder="09xxxxxxxx" autoFocus required />
                                </div>
                                <div className="mt-2 form-label-group">
                                    <label htmlFor="inputPassword">Mật khẩu</label>
                                    <input
                                        name="password"
                                        onChange={this.handleInputChange}
                                        type="password" className="form-control boder-style" placeholder="*********" required />
                                </div>
                                <div className="custom-control custom-checkbox mb-3">
                                    <input
                                        onChange={this.handleInputChange}
                                        name="rememberLogin" type="checkbox" className="custom-control-input" id="customCheck1" />
                                    <label className="mt-2 custom-control-label" htmlFor="customCheck1">Ghi nhớ đăng nhập</label>
                                </div>
                                <button className=" boder-style btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Đăng nhập</button>
                                <div className="text-center">
                                    <a href="#"> Quên mật khẩu?</a>
                                </div>

                                <div className="text-center my-3">
                                    <span>Chưa có tài khoản? </span><Link to="/register" className="badge badge-pill badge-success"> Đăng kí ngay</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    
});
export default connect(mapStateToProps)(Login);