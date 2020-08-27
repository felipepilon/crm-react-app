import React, { useContext } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect
} from 'react-router-dom';
import Login from './containers/login/LoginWrapper';
import Workspace from './containers/workspace/WorkspaceWrapper';
import PrivateRoute from './components/PrivateRoute';
import UnauthRoute from './components/UnauthRoute';
import { AuthContext } from './contexts/Auth';
import { LastLocationProvider } from 'react-router-last-location';

const AppRouter = () => {
    const { isAuthenticated } = useContext(AuthContext);
    
    return (
        <Router>
            <LastLocationProvider>
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
                                isAuthenticated ?
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
            </LastLocationProvider>
        </Router>
    );
}
 
export default AppRouter;