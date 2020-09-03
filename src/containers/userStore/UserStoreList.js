import React, { useState } from 'react';
import { get_UserStores } from '../../services/UserStore';
import { useLocation, useRouteMatch } from 'react-router-dom';
import EnhancedListPage from '../../components/list/EnhancedListPage';

const UserStoreList = (props) => {
    const loc = useLocation();

    const { path } = useRouteMatch();

    console.log('loc.pathname', loc.pathname)
    console.log('path', path)

    const [ columns ] = useState([
        { name: '_edit', title: 'Edit', comp: 'editIcon', to: (row) => {
            return {
                pathname: `${loc.pathname}/${row.user_store_id}`,
                state: { from: loc },
            }
        }},
        { name: '_delete', title: 'Delete', comp: 'deleteIcon', },
        { name: 'user_email', title: 'Email', },
        { name: 'user_name', title: 'Name', },
        { name: 'store_name', title: 'Store', },
    ]);

    const [ buttons ] = useState([
        { 
            title: "New",
            to: () => {
                return {
                    pathname: `${loc.pathname}/_new`,
                    state: { from: loc },
                };
            }
        }
    ]);
    
    return (
        <EnhancedListPage
            title="User Stores"
            columns={columns}
            buttons={buttons}
            findDataFnc={get_UserStores}
            findDataParams={{user_id: props.user_id}}
        />
    )
};

export default UserStoreList;