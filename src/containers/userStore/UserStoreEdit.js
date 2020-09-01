import React, { useState } from 'react';
import EnhancedEditPage from '../../components/edit/EnhancedEditPage';
import { post_UserStore, get_UserStore } from '../../services/UserStore';
import { get_Stores } from '../../services/Store';

const UserStoreEdit = (props) => {
    const [fields] = useState({
        groups: [
            {
                fields: [
                    { name: 'user_id', title: 'User' },
                    { name: 'store_id', title: 'Store', comp: 'select', findDataFnc: get_Stores, labelColumnName: 'name' },
                ],
            },
        ]
    });

    return (
        <EnhancedEditPage
            title={props._new ? 'New User Store' : 'Edit User Store'}
            fields={fields}
            postFnc={post_UserStore}
            findRecordFnc={get_UserStore}
            findParams={{user_store_id: props.user_store_id}}
            _new={props._new}
        />
    )
}
 
export default UserStoreEdit;