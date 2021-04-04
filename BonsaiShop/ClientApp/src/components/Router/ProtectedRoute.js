import React from 'react';
import { Route, Redirect } from 'react-router-dom';



function ProtectedRoute({ isAuth: isAuth, component: Component, ...rest }) {
    return (
        <Route exact {...rest} render={(props) => {
            if (isAuth) {
                return <Component />
            } else {
                return <Redirect to={{ pathname: '/KhongCoQuyenTruyCap', state: { from: props.location } }} />
            }
        }} />
    )
}

export default ProtectedRoute