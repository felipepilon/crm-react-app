import React, { useState } from 'react';
import { 
    get_User,
    post_User,
} from '../../../services/User';
import EnhancedEditPage from '../../../components/edit/EnhancedEditPage';

const StoreEdit = (props) => {
    const [fields] = useState({
        groups: [
            {
                fields: [
                    { name: 'email', title: 'Email' },
                    { name: 'password', title: 'Password' },
                    { name: 'first_name', title: 'First Name' },
                    { name: 'last_name', title: 'Last Name' },
                    { name: 'role', title: 'Role' },
                ],
            },
        ]
    });

    return (
        <EnhancedEditPage
            title={props._new ? 'New User' : 'Edit User'}
            fields={fields}
            postFnc={post_User}
            findRecordFnc={get_User}
            findParams={{user_id: props.user_id}}
            _new={props._new}
        />
    )
};

export default StoreEdit;