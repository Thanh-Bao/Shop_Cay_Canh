import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppRouter from './router/AppRouter';

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