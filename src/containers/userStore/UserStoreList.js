import React, { useState } from 'react';
import { get_UserStores } from '../../services/UserStore';
import { useLocation } from 'react-router-dom';
import EnhancedListPage from '../../components/list/EnhancedListPage';

const UserStoreList = (props) => {
    const loc = useLocation();

    const [ columns ] = useState([
        { name: '_edit', title: 'Edit', comp: 'editIcon', to: (row) => {
            return {
                pathname: `/workspace/users/edit/${row.user_store_id}`,
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
                    pathname: '/workspace/userStores/add',
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