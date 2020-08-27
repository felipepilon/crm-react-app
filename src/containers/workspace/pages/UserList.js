import React, { useState } from 'react';
import { get_Users } from '../../../services/User';
import { useLocation } from 'react-router-dom';
import EnhancedListPage from '../../../components/list/EnhancedListPage';

const UserList = () => {
    const loc = useLocation();

    const [ columns ] = useState([
        { name: '_edit', title: 'Edit', type: 'icon edit', to: (row) => {
            return {
                pathname: `/workspace/users/edit/${row.user_id}`,
                state: { from: loc },
            }
        }},
        { name: 'email', title: 'Email', },
        { name: 'name', title: 'Name', },
        { name: 'role', title: 'Role', intl: true, },
        { name: '_store_groups', type: 'link', intl: true, value: 'Store Groups', },
        { name: '_stores', type: 'link', intl: true, value: 'Stores', },
    ]);

    const [ buttons ] = useState([
        { 
            title: "New",
            to: () => {
                return {
                    pathname: '/workspace/users/add',
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