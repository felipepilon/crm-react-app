import React from 'react';
import { useRouteMatch, Route, Switch } from 'react-router-dom';
import UserList from './UserList';
import UserEdit from './UserEdit';
import UserStoreList from '../userStore/UserStoreList';
import UserStoreEdit from '../userStore/UserStoreEdit';

const UserRouter = () => {
    const { path } = useRouteMatch();
    
    return (
        <Switch>
            <Route exact path={`${path}/:user_id/stores/:user_store_id`}
                render={({match}) => {
                    return (
                        <UserStoreEdit
                            user_id={match.params.user_id}
                            user_store_id={match.params.user_store_id}
                        />
                    )
                }}
            />
            <Route exact path={`${path}/:user_id/stores`}
                render={({match}) => {
                    return (
                        <UserStoreList
                            user_id={match.params.user_id}
                        />
                    )
                }}
            />
            <Route exact path={`${path}/:user_id`}
                render={({match}) => {
                    return (
                        <UserEdit
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