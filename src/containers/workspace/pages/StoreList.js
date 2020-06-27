import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import EnhancedTable from '../../../components/table/EnhancedTable';
import { stores as storesAPI } from '../../../services/Store';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';

const StoreList = () => {
    let [ data, setData ] = useState([]);
    
    const hist = useHistory();

    useEffect(() => {
        storesAPI({})
        .then(result => {
            setData(result);
        });
    }, []);

    const handleEdit = (_rowId) => {
        const { storeId } = data[_rowId]

        hist.push(`/workspace/stores/edit/${storeId}`)
    }

    const handleCellClick = (colName, _rowId) => {
        const fnc = colName === '_edit' ? handleEdit :
            null;
        
        if (fnc)
            fnc(_rowId);
    };

    const [ columns ] = useState([
        { name: '_edit', title: 'Edit', icon: 'edit', },
        { name: 'company.cnpj', title: 'CNPJ', },
        { name: 'company.name', title: 'Name', },
        { name: 'company.city', title: 'City', },
        { name: 'company.addr1', title: 'Address 1', },
        { name: 'company.addr2', title: 'Address 2', },
        { name: 'company.addr3', title: 'Address 3', },
        { name: 'company.zip', title: 'ZIP', },
        { name: 'company.state', title: 'State', },
        { name: 'company.phone1', title: 'Phone 1', },
        { name: 'company.phone2', title: 'Phone 2', },
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