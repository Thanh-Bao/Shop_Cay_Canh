import React, { Component } from 'react';
import firebaseConfig from '../../FirebaseConfig';
import { connect } from 'react-redux';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase';
import 'firebaseui/dist/firebaseui.css';
import callAPi from '../../callAPI/callAPIMainServer';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

class OTPRegister extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRegisterTemple: localStorage.getItem("userRegister").phone
        }

    }

    componentDidMount() {
        console.log(this.props.userRegisterTemple);
        const uiConfig = {
            signInOptions: [{
                provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                recaptchaParameters: {
                    type: 'image',
                    size: 'normal',
                    badge: 'bottomleft'
                },
                defaultCountry: 'VN',
                defaultNationalNumber: localStorage.getItem("userRegister").phone
            }],
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    callAPi('Users/register', 'POST', null, localStorage.getItem("userRegister")).then(res => {
                        console.log(res.data)
                    });
                    alert('Đăng kí tài khoản thành công, mời bạn đăng nhập');
                    return true;
                }
            },
            signInSuccessUrl: "/login"
        };

        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start("#firebaseui-auth-container", uiConfig);

    };
    render() {
        return (
            <div>

                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <h3 className="font-weight-bold">Nhập mã OTP được gửi đến SĐT: {localStorage.getItem("userRegister").phone}</h3>
                    </div>
                </div>
                <div className="container mt-2 mb-5">
                    <div className="row justify-content-center">
                        <div id='firebaseui-auth-container'>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
});
export default connect(mapStateToProps)(OTPRegister);
