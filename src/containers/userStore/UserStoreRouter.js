import React from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';
import UserStoreList from './UserStoreList';

const UserStoreRouter = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${path}/:user_id`}>
                <UserStoreList/>
            </Route>
        </Switch>
    );
}
 
export default UserStoreRouter;