import React from 'react';
import { useRouteMatch, Route, Switch, Redirect } from 'react-router-dom';
import StoreList from './pages/StoreList';
import StoreEdit from './pages/StoreEdit';

const WorkspaceRouter = () => {
    const { path } = useRouteMatch();
    
    return (
        <Switch>
            <Route exact path={`${path}`}>
                <div>Workspace Home</div>
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