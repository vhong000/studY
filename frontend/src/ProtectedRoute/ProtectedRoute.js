/* ProtectedRoute.js */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute ({ component: Component, ...rest }){
    const token = localStorage.getItem('token');
    return (
        <Route
            {...rest}
            render={props =>
                token ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    );
}
export default ProtectedRoute;