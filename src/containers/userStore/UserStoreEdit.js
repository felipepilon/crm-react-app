import React, { useState } from 'react';
import EnhancedEditPage from '../../components/edit/EnhancedEditPage';
import { post_UserStore, get_UserStore, delete_UserStore } from '../../services/UserStore';
import { get_Stores } from '../../services/Store';
import { get_Users } from '../../services/User';

const UserStoreEdit = ({user_id, user_store_id}) => {
    const _new = user_store_id === '_new';

    const [fields] = useState({
        groups: [
            {
                fields: [
                    { name: 'user_id', title: 'User', comp: 'select', optionsFnc: get_Users, pickLabelColumn: 'name', params: {user_id}, default: user_id, disabled: user_id },
                    { name: 'store_id', title: 'Store', comp: 'select', optionsFnc: get_Stores, pickLabelColumn: 'name', 
                        hideSelectOption: !_new,
                        params: { [_new ? 'unassigned_to' : 'exact_or_unassigned_to']: user_id, user_store_id },
                    }
                ],
            },
        ]
    });

    return (
        <EnhancedEditPage
            title={_new ? 'New User Store' : 'Edit User Store'}
            fields={fields}
            postFnc={post_UserStore}
            findFnc={get_UserStore}
            findParams={{user_store_id}}
            deleteFnc={delete_UserStore}
            deleteParams={{user_store_id}}
            _new={_new}
        />
    )
}
 
export default UserStoreEdit;