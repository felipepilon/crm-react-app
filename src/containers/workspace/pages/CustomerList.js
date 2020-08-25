import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@material-ui/core';
import EnhancedTable from '../../../components/table/EnhancedTable';
import { get_Customers } from '../../../services/Customer';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';

const StoreList = () => {
    const [ data, setData ] = useState([]);
    const [ lastUpdate, setLastUpdate ] = useState(null);
    
    const hist = useHistory();
    const location = useLocation();
    const intl = useIntl();
    const theme = useTheme();

    useEffect(() => {
        document.title = intl.formatMessage({ id: 'Customers' });

        get_Customers({})
        .then((result) => {
            const td = result.map((row, i) => {
                return { 
                    ...{_rowId: i},
                    ...row,
                }
            });

            setData(td);
            setLastUpdate(new Date());
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = (_rowId) => {
        const { customer_id } = data[_rowId]

        console.log('list.customer_id', customer_id)
        hist.push(`/workspace/customers/edit/${customer_id}`, { from: location });
    };

    const handleCellClick = (colName, _rowId) => {
        const fnc = colName === '_edit' ? handleEdit :
            null;
        
        if (fnc)
            fnc(_rowId);
    };

    const [ columns ] = useState([
        { name: '_edit', title: 'Edit', icon: 'edit', },
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
        <Box
            display='flex'
            flexDirection='column'
            height='100%'
            boxSizing='border-box'
        >
            <Typography variant='h6' style={{padding: theme.spacing(2)}}>
                <FormattedMessage id='Customers'/>
            </Typography>
            <EnhancedTable
                columns={columns}
                data={data}
                fullHeight
                handleCellClick={handleCellClick}
                dataStatus={lastUpdate ? 'loaded' : 'loading'}
            />
        </Box>
    )
};

export default StoreList;