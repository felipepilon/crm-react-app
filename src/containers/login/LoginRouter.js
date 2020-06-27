import React, { useContext } from 'react';
import { useRouteMatch, Route, Switch, Redirect } from 'react-router-dom';
import Email from './Email';
import Password from './Password';
import { AuthContext } from '../../contexts/Auth';

const LoginRouter = () => {
    const { user } = useContext(AuthContext);

    const { path } = useRouteMatch();
    
    return (
        <Switch>
            <Route exact path={`${path}`}>
                <Email/>
            </Route>
            <Route exact path={`${path}/email`}>
                <Email/>
            </Route>
            <Route path={`${path}/password`}
                render={({location}) => {
                    return (
                        user.email ?
                        <Password/> :
                        <Redirect to={{
                            pathname: `${path}/email`,
                            state: { from: location },
                        }}/>
                    )
                }}
            />
            <Route exact path={`${path}/passwordRecover`}>
                <div>Password Recover</div>
            </Route>
            <Route exact path={`${path}/continue`}>
                <div>Continue</div>
            </Route>
            <Route path={`${path}/*`}
                render={({location}) => {
                    return (
                        <Redirect to={{
                            pathname: path,
                            state: { from: location },
                        }}/>
                    )
                }}
            />
        </Switch>
    );
}
 
export default LoginRouter;