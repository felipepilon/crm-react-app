import React, { useState } from 'react';
import { 
    get_User,
    post_User,
} from '../../services/User';
import EnhancedEditPage from '../../components/edit/EnhancedEditPage';
import { useIntl } from 'react-intl';

const StoreEdit = (props) => {
    const _new = props.user_id === '_new';

    const intl = useIntl();

    const [fields] = useState({
        groups: [
            {
                fields: [
                    { name: 'email', title: 'Email' },
                    { name: 'password', title: 'Password' },
                    { name: 'first_name', title: 'First Name' },
                    { name: 'last_name', title: 'Last Name' },
                    { name: 'role', title: 'Role', comp: 'select', hideSelectOption: !_new, options: [
                        {value: 'Connector', label: intl.formatMessage({id: 'Connector'})},
                        {value: 'Sys Admin', label: intl.formatMessage({id: 'Sys Admin'})},
                        {value: 'Manager', label: intl.formatMessage({id: 'Manager'})},
                        {value: 'Salesman', label: intl.formatMessage({id: 'Salesman'})}
                    ] },
                ],
            },
        ]
    });

    return (
        <EnhancedEditPage
            title={_new ? 'New User' : 'Edit User'}
            fields={fields}
            postFnc={post_User}
            findFnc={get_User}
            findParams={{user_id: props.user_id}}
            _new={_new}
        />
    )
};

export default StoreEdit;