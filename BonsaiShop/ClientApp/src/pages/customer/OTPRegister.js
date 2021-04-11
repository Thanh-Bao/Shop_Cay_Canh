import React, { Component } from 'react';
import firebaseConfig from '../../FirebaseConfig';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase';
import 'firebaseui/dist/firebaseui.css';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

class OTPRegister extends Component {
    componentDidMount() {
        const uiConfig = {
            signInOptions: [{
                provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                recaptchaParameters: {
                    type: 'image',
                    size: 'normal',
                    badge: 'bottomleft'
                },
                defaultCountry: 'VN',
                defaultNationalNumber: '1234567890'
            }],
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
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
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div id='firebaseui-auth-container'>
                    </div>
                </div>
            </div>
        );
    }
}

export default OTPRegister;
