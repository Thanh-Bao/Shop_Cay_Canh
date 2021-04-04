import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppRouter from './router/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all.js';
import './css/Main.css';

class App extends Component {
    render() {
        return (
            <AppRouter/>
        );
    }
}
const mapStateToProps = state => ({
    kkk: state.abc
})
export default connect(mapStateToProps)(App);