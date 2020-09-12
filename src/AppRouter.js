import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './containers/login/LoginWrapper';
import Workspace from './containers/workspace/WorkspaceWrapper';
import PrivateRoute from './components/PrivateRoute';
import UnauthRoute from './components/UnauthRoute';
import { AuthContext } from './contexts/Auth';

const AppRouter = () => {
    const { user } = useContext(AuthContext);
    
    return (
        <Switch>
            <PrivateRoute path="/workspace">
                <Workspace/>
            </PrivateRoute>
            <UnauthRoute path="/login">
                <Login/>
            </UnauthRoute>
            <Route 
                path={`/*`}
                render={({location}) => {
                    return (
                        user.authenticated ?
                        <Redirect to={{
                            pathname: '/workspace',
                            state: { from: location },
                        }}/> :
                        <Redirect to={{
                            pathname: '/login',
                            state: { from: location },
                        }}/>
                    )
                }}
            />
        </Switch>
    );
}
 
export default AppRouter;