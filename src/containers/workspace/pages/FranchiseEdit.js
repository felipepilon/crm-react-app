import React, { useState, useEffect, useContext } from 'react';
import { Box } from '@material-ui/core';
import EnhancedEditForm from '../../../components/edit/EnhancedEditForm';
import { 
    franchise as franchiseAPI,
    update as updateAPI,
} from '../../../services/Franchise';
import { useHistory, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { AppStateContext } from '../../../contexts/AppState';

const FranchiseEdit = (props) => {
    const { setSucessSnack } = useContext(AppStateContext);

    const [ data, setData ] = useState();
    const [ errors, setErrors ] = useState({});

    const intl = useIntl();
    const hist = useHistory();
    const loc = useLocation();

    const handleCancel = () => {
        hist.goBack();
    };

    const handleReset = () => {
        findRecord();
    };

    const handleConfirm = () => {
        updateAPI(data)
        .then((dat) => {
            setSucessSnack('Franchise updated successfully')
            
            if (loc.state.from || loc.state.from.pathname)
                hist.push(loc.state.from.pathname);
        })
        .catch((err) => {
            console.log('err =>', err)
            setErrors(err);
        })
    }

    const findRecord = () => {
        franchiseAPI(props.franchiseId)
        .then((result) => {
            setData(result);
        })
    };

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

    const handleFieldChange = (name, value) => {
        const updData = { ...data }

        if (
            name === 'cnpj' ||
            name === 'phone1' ||
            name === 'phone2' 
        )
        {
            value = value.replace(/(\D)+/g,'');
        }

        updData[name] = value;
        setData(updData);
    };
    
    useEffect(() => {
        document.title = intl.formatMessage({ id: 'Edit Franchise' });
        findRecord();
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
                    title='Edit Franchise'
                    fields={fields}
                    data={data}
                    errors={errors}
                    handleFieldChange={handleFieldChange}
                    handleCancel={hist.length > 1 ? handleCancel : null}
                    handleReset={handleReset}
                    handleConfirm={handleConfirm}
                />
            </Box>
        </Box>
    )
};

export default FranchiseEdit;