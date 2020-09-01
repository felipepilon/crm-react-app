import React, { useState } from 'react';
import { get_Customers } from '../../services/Customer';
import { useLocation } from 'react-router-dom';
import EnhancedListPage from '../list/EnhancedListPage';

const StoreList = () => {
    const loc = useLocation();

    const [ columns ] = useState([
        { name: '_edit', title: 'Edit', type: 'icon edit', to: (row) => {
            return {
                pathname: `/workspace/customers/edit/${row.customer_id}`,
                state: { from: loc },
            }
        }},
        { name: 'cpf', title: 'CPF', mask: 'cpf', },
        { name: 'name', title: 'Name', },
        { name: 'email', title: 'Email' },
        { name: 'phone1', title: 'Phone 1', mask: 'phone', },
        { name: 'phone2', title: 'Phone 2', mask: 'phone', },
        { name: 'bith_date', title: 'Birth Day', mask: 'date' },
        { name: 'city', title: 'City', },
        { name: 'addr1', title: 'Address 1', },
        { name: 'addr2', title: 'Address 2', },
        { name: 'addr3', title: 'Address 3', },
        { name: 'zip', title: 'ZIP', },
        { name: 'state', title: 'State', },
    ]);
    
    return (
        <EnhancedListPage
            title="Users"
            columns={columns}
            findDataFnc={get_Customers}
        />
    );
};

export default StoreList;