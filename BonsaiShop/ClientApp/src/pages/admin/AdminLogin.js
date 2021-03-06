import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../css/Login.css'
import callAPi from '../../callAPI/callAPIMainServer';

class AdminLogin extends Component {
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
        const name = target.name;
        let value = target.value;
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
          
            if (res.data.role.localeCompare("Admin")===0) {
                localStorage.setItem("token", res.data.token);
                this.props.dispatch({ type: "UPDATE_ADMIN_LOGIN", data: true });
                localStorage.setItem("adminLogined",true);
                this.props.history.push('/admin')
            } else {
                this.setState({
                    loginfailed: true
                })
                this.props.history.push('/admin/login')
            }
           
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
                    <strong><i className="fas fa-exclamation-triangle"></i></strong> Sai t??i kho???n! Vui l??ng ki???m tra l???i.
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">??</span>
                    </button>
                </div>
            );
        }
        return (
            <div>
                <div className="container-fluid mt-5 mt-5">
                    <div className="row no-gutter d-flex justify-content-center my-5 pb-5">
                        <div className="col-lg-4 col-sm-12">
                            <form onSubmit={this.handleSubmit}>
                                <div className="text-center mb-5">
                                    <i style={{ fontSize: 80 }} className="fas fa-user-shield"></i>
                                </div>

                                {loginFailedMessage}

                                <div className="form-label-group">
                                    <label htmlFor="inputEmail">T??n t??i kho???n</label>
                                    <input
                                        name="phone"
                                        onChange={this.handleInputChange}
                                        type="text" className="form-control  boder-style" autoFocus required />
                                </div>
                                <div className="mt-2 form-label-group">
                                    <label htmlFor="inputPassword">M???t kh???u</label>
                                    <input
                                        name="password"
                                        onChange={this.handleInputChange}
                                        type="password" className="form-control boder-style" placeholder="*********" required />
                                </div>
                                <button className=" boder-style btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mt-5" type="submit"><i className="fas fa-unlock"></i> Admin ????ng nh???p</button>
                            </form>
                        </div>
                    </div>

                    <div className="row text-center justify-content-center">
                        <div className="col-12">
                            <Link to="/home" className="btn btn-success btn-lg active" role="button" aria-pressed="true"> <i className="fas fa-home"></i> Trang ch???</Link>
                            <br />
                            <p className="mt-3 text-danger font-weight-bold">N???u b???n kh??ng ph???i Admin h??y tr??? v??? trang ch???</p>
                        </div>
                    </div>


                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    adminLogined: state.adminLogined
});
export default connect(mapStateToProps)(AdminLogin);