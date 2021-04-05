import React, { Component } from 'react';
import AppRouter from './router/AppRouter';
import '@fortawesome/fontawesome-free/js/all.js';
import './css/Main.css';

class App extends Component {
    render() {
        return (
            <AppRouter />
        );
    }
}

export default App;