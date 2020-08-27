import React from 'react';
import { useRouteMatch, Route, Switch, Redirect } from 'react-router-dom';
import StoreList from './pages/StoreList';
import StoreEdit from './pages/StoreEdit';
import StoreGroupEdit from './pages/StoreGroupEdit';
import FranchiseList from './pages/FranchiseList';
import FranchiseEdit from './pages/FranchiseEdit';
import CustomerList from './pages/CustomerList';
import WorkspaceHome from './pages/WorkspaceHome';
import ReserveAdd from './pages/ReserveAdd';
import CustomerView from './pages/CustomerView';
import CustomerEdit from './pages/CustomerEdit';
import UserList from './pages/UserList';
import StoreGroupList from './pages/StoreGroupList';
import UserEdit from './pages/UserEdit';

const WorkspaceRouter = () => {
    const { path } = useRouteMatch();
    
    return (
        <Switch>
            <Route exact path={`${path}`}>
                <WorkspaceHome/>
            </Route>

            <Route exact path={`${path}/reserve/add`}>
                <ReserveAdd/>
            </Route>

            <Route exact path={`${path}/stores/list`}>
                <StoreList/>
            </Route>
            <Route exact path={`${path}/stores/edit/:storeId`}
                render={({match}) => {
                    return (
                        <StoreEdit
                            storeId={match.params.storeId}
                        />
                    )
                }}
            />

            <Route exact path={`${path}/franchises/list`}>
                <FranchiseList/>
            </Route>
            <Route exact path={`${path}/franchises/edit/:franchiseId`}
                render={({match}) => {
                    return (
                        <FranchiseEdit
                            franchiseId={match.params.franchiseId}
                        />
                    )
                }}
            />

            <Route exact path={`${path}/customers/list`}>
                <CustomerList/>
            </Route>
            <Route exact path={`${path}/customers/edit/:customer_id`}
                render={({match}) => {
                    return (
                        <CustomerEdit
                        customer_id={match.params.customer_id}
                        />
                    )
                }}
            />
            <Route exact path={`${path}/customers/view/:customer_id`}
                render={({match}) => {
                    return (
                        <CustomerView
                            customer_id={match.params.customer_id}
                        />
                    )
                }}
            />

            <Route exact path={`${path}/storeGroups/list`}>
                <StoreGroupList/>
            </Route>
            <Route exact path={`${path}/storeGroups/add`}>
                <StoreGroupEdit _new/>
            </Route>
            <Route exact path={`${path}/storeGroups/edit/:store_group_id`}
                render={({match}) => {
                    return (
                        <StoreGroupEdit
                            store_group_id={match.params.store_group_id}
                        />
                    )
                }}
            />

            <Route exact path={`${path}/users/list`}>
                <UserList/>
            </Route>
            <Route exact path={`${path}/users/add`}>
                <UserEdit _new/>
            </Route>
            <Route exact path={`${path}/users/edit/:user_id`}
                render={({match}) => {
                    return (
                        <UserEdit
                            user_id={match.params.user_id}
                        />
                    )
                }}
            />
            
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
 
export default WorkspaceRouter;