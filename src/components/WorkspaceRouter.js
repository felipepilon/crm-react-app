import React from 'react';
import { useRouteMatch, Route, Switch, Redirect } from 'react-router-dom';
import StoreList from './pages/StoreList';
import StoreEdit from './pages/StoreEdit';
import FranchiseList from './pages/FranchiseList';
import FranchiseEdit from './pages/FranchiseEdit';
import WorkspaceHome from './pages/WorkspaceHome';
import ReserveAdd from './pages/ReserveAdd';
import CustomerView from '../containers/customer-view/CustomerView';
import UserRouter from '../containers/user/UserRouter';
import CustomerRouter from '../containers/customer/CustomerRouter';
import StoreGroupRouter from '../containers/store-group/StoreGroupRouter';

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

            <Route exact path={`${path}/customers/view/:customer_id` }
                render={({match}) => {
                    return (    
                        <CustomerView
                            key={match.params.customer_id}
                            customer_id={match.params.customer_id}
                        />
                    )
                }}
            />
            <Route path={`${path}/customers`}>
                <CustomerRouter/>
            </Route>

            <Route path={`${path}/storeGroups`}>
                <StoreGroupRouter/>
            </Route>
            
            <Route path={`${path}/users`}>
                <UserRouter/>
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
 
export default WorkspaceRouter;