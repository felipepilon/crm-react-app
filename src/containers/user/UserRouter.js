import React from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';
import UserList from './UserList';
import UserStoreList from '../user-store/UserStoreList';

const UserRouter = () => {
    const { path } = useRouteMatch();
    
    return (
        <Switch>
            <Route exact path={`${path}/:user_id/stores`}
                render={({match}) => {
                    return (
                        <UserStoreList
                            user_id={match.params.user_id}
                        />
                    )
                }}
            />
            <Route path={`${path}`}>
                <UserList/>
            </Route>
        </Switch>
    );
}
 
export default UserRouter;