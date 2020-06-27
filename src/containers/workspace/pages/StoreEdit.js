import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import EnhancedEditForm from '../../../components/edit/EnhancedEditForm';
import { store as storeAPI } from '../../../services/Store';
import { setObjectValue } from '../../../utils/ObjectValueReader';

const StoreEdit = (props) => {
    const [ data, setData ] = useState();

    const [ fields ] = useState({
        groups: [
            {
                fields: [
                    { name: 'company.cnpj', title: 'CNPJ', type: 'label', mask:'cnpj' },
                    { name: 'company.name', title: 'Name' },
                ],
            },
            {
                title: 'Address',
                fields: [
                    { name: 'company.zip', title: 'ZIP' },
                    { name: 'company.city', title: 'City' },
                    { name: 'company.addr1', title: 'Address 1' },
                    { name: 'company.addr2', title: 'Address 2' },
                    { name: 'company.phone1', title: 'Phone 1', mask:'phone' },
                    { name: 'company.phone2', title: 'Phone 2', mask:'phone' },
                ],
            },
        ]
    });

    const [ errors ] = useState({});

    const handleFieldChange = (name, value) => {
        const updData = { ...data }

        if (
            name === 'company.cnpj' ||
            name === 'company.phone1' ||
            name === 'company.phone2' 
        )
        {
            value = value.replace(/(\D)+/g,'');
        }

        setObjectValue(updData, name, value);
        console.log( 'updData =>', updData);
        setData(updData);
    };
    
    useEffect(() => {
        storeAPI(props.storeId)
        .then((result) => {
            setData(result);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box
            display='flex'
            maxWidth='100%'
            justifyContent='center'
        >
            <Box
                maxWidth='450px'
            >
                <EnhancedEditForm
                    title='Edit Store'
                    fields={fields}
                    data={data}
                    errors={errors}
                    handleFieldChange={handleFieldChange}
                />
            </Box>
        </Box>
    )
};

export default StoreEdit;