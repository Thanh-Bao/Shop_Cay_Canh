import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../css/Login.css'
import callAPi from '../../callAPI/callAPIMainServer';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            password: "",
            retypePassword: "x",
            showMessage: false,
            messageFailed: null
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleInputChange(event) {
        const target = event.target;
        let value = target.value;
        const name = target.name;


        this.setState({
            [name]: value,
            showMessage: false
        });
        console.log(this.state);
    }


    handleSubmit(event) {
        event.preventDefault();
        let body = {
            phone: this.state.phone,
            password: this.state.password
        }

        if (this.state.password.length < 6) {
            this.setState({
                showMessage: true,
                messageFailed: "Mật khẩu tối thiểu 6 kí tự"
            })
        } else if (this.state.password === this.state.retypePassword) {
            callAPi('Users/check-exist', 'POST', null, body).then(res => {
                if (res.data) {
                    this.setState({
                        showMessage: true,
                        messageFailed: "Số điện thoại đã được đăng kí"
                    })
                } else {
                    let userRegister = {
                        phone: this.state.phone,
                        password: this.state.password
                    }
                     localStorage.setItem("userRegister",userRegister);
                     setTimeout(this.props.history.push('/otp-register'), 2000);
                    
                }
            }).catch(
                err => {
                    this.setState({
                        showMessage: true,
                        messageFailed: "Lỗi hệ thống, vui lòng thử lại sau"
                    })
                }
            )
        } else {
            this.setState({
                showMessage: true,
                messageFailed: "Mật khẩu không khớp nhau"
            })
        }
    }



    render() {
        let loginFailedMessage;
        if (this.state.showMessage) {
            loginFailedMessage = (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong><i className="fas fa-exclamation-triangle"></i></strong> {this.state.messageFailed}
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
                                    <i style={{ fontSize: 80 }} className="fas fa-user-plus"></i>
                                </div>

                                {loginFailedMessage}

                                <div className="form-label-group">
                                    <label >Số điện thoại</label>
                                    <input
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
                                <div className="mt-2 form-label-group">
                                    <label htmlFor="inputPassword">Nhập lại mật khẩu</label>
                                    <input
                                        name="retypePassword"
                                        onChange={this.handleInputChange}
                                        type="password" className="form-control boder-style" placeholder="*********" required />
                                </div>

                                <button className="mt-4 boder-style btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Đăng kí</button>


                                <div className="text-center my-3">
                                    <span>đã có tài khoản? </span><Link to="/login" className="badge badge-pill badge-success"> Đăng nhập ngay</Link>
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
export default connect(mapStateToProps)(Register);