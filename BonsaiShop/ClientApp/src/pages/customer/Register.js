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
            rememberLogin: false,
            loginfailed: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleInputChange(event) {
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
            console.log(res.data);
            localStorage.setItem("token",res.data.token);
            alert("Đăng nhập thành công");
            this.props.dispatch({type:"UPDATE_CUSTOMER_WELCOME",data:res.data.name});
            localStorage.setItem("customerName",res.data.name);
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
        let loginFailedMessage;
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
                                    <i style={{ fontSize: 80 }} className="fas fa-user-plus"></i>
                                </div>

                                {loginFailedMessage}

                                <div className="form-label-group">
                                    <label htmlFor="inputEmail">Số điện thoại</label>
                                    <input
                                        name="phone"
                                        onChange={this.handleInputChange}
                                        type="text" className="form-control  boder-style" placeholder="09xxxxxxxx" autoFocus required />
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