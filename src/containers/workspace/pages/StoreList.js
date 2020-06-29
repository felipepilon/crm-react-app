import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import EnhancedTable from '../../../components/table/EnhancedTable';
import { stores as storesAPI } from '../../../services/Store';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';

const StoreList = () => {
    let [ data, setData ] = useState([]);
    
    const hist = useHistory();
    const location = useLocation();
    const intl = useIntl();

    useEffect(() => {
        document.title = intl.formatMessage({ id: 'Stores' });

        storesAPI({})
        .then(result => {
            setData(result);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = (_rowId) => {
        const { storeId } = data[_rowId]

        hist.push(`/workspace/stores/edit/${storeId}`, { from: location });
    };

    const handleCellClick = (colName, _rowId) => {
        const fnc = colName === '_edit' ? handleEdit :
            null;
        
        if (fnc)
            fnc(_rowId);
    };

    const [ columns ] = useState([
        { name: '_edit', title: 'Edit', icon: 'edit', },
        { name: 'company.cnpj', title: 'CNPJ', mask: 'cnpj', },
        { name: 'company.name', title: 'Name', },
        { name: 'company.city', title: 'City', },
        { name: 'company.addr1', title: 'Address 1', },
        { name: 'company.addr2', title: 'Address 2', },
        { name: 'company.addr3', title: 'Address 3', },
        { name: 'company.zip', title: 'ZIP', },
        { name: 'company.state', title: 'State', },
        { name: 'company.phone1', title: 'Phone 1', mask: 'phone', },
        { name: 'company.phone2', title: 'Phone 2', mask: 'phone', },
    ]);
    
    return (
        <Box
            display='flex'
            flexDirection='column'
            minHeight='0'
            height='100%'
        >
            <Box padding={2}>
                <Typography variant='h6'>
                    <FormattedMessage id='Stores'/>
                    { ` - Count: ${data.length}` }
                </Typography>
            </Box>
            <EnhancedTable
                columns={columns}
                data={data}
                handleCellClick={handleCellClick}
            />
        </Box>
    )
};

export default StoreList;