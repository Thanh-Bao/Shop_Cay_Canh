import { BrowserRouter as Router } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom';
import Store from './Store';
import { Provider } from 'react-redux';
import App from './App';

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={Store}>
        <Router >
            <App />
        </Router>
    </Provider>
    ,
    rootElement);
