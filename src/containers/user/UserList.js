import React, { useState } from 'react';
import { get_Users } from '../../services/User';
import { useLocation, useRouteMatch } from 'react-router-dom';
import EnhancedListPage from '../../components/list/EnhancedListPage';

const UserList = () => {
    const loc = useLocation();

    const [ columns ] = useState([
        { name: '_edit', title: 'Edit', comp: 'editIcon', to: (row) => {
            return {
                pathname: `${loc.pathname}/${row.user_id}`,
                state: { from: loc },
            }
        }},
        { name: 'email', title: 'Email', },
        { name: 'name', title: 'Name', },
        { name: 'role', title: 'Role', comp: 'intl', },
        { name: '_store_groups', comp: 'intlLink', value: 'Store Groups', to: (row) => {
            return {
                pathname: `/workspace/usersStoreGroups/list/${row.user_id}`,
                state: { from: loc },
            }
        }},
        { name: '_stores', comp: 'intlLink', value: 'Stores', to: (row) => {
            return {
                pathname: `${loc.pathname}/${row.user_id}/stores`,
                state: { from: loc },
            }
        }},
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
            title="Users"
            columns={columns}
            buttons={buttons}
            findDataFnc={get_Users}
        />
    )
};

export default UserList;