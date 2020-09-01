import React, { useContext } from 'react';
import { AuthContext } from '../contexts/Auth';
import { Route, Redirect } from 'react-router-dom';

const UnauthRoute = ({ children, ...rest }) => {
    const { user } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={({ location }) =>
            !user.authenticated ? (
                children
            ) : (
                <Redirect
                    to={{
                        pathname: "/workspace",
                        state: { from: location }
                    }}
                />
            )
            }
        />
    );
}
 
export default UnauthRoute;