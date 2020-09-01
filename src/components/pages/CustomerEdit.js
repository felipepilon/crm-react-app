import React, { useState, useEffect, useContext } from 'react';
import EnhancedEditForm from '../edit/EnhancedEditForm';
import { 
    get_Customer,
    post_Customer,
} from '../../services/Customer';
import { useHistory, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { AppStateContext } from '../../contexts/AppState';

const CustomerEdit = (props) => {
    const { setSucessSnack } = useContext(AppStateContext);

    const [ data, setData ] = useState();
    const [ errors, setErrors ] = useState({});
    const [ fields ] = useState({
        groups: [
            {
                fields: [
                    { name: 'name', title: 'Name' },
                    { name: 'cpf', title: 'CPF', mask:'cpf' },
                    { name: 'national_id', title: 'RG' },
                    { name: 'birth_date', title: 'Birth Date', mask: 'date' },
                ],
            },
            {
                title: 'Contact Data',
                fields: [
                    { name: 'email', title: 'Email' },
                    { name: 'phone1', title: 'Phone 1', mask:'phone' },
                    { name: 'phone2', title: 'Phone 2', mask:'phone' },
                ],
            }, 
            {
                title: 'Address',
                fields: [
                    { name: 'zip', title: 'ZIP' },
                    { name: 'city', title: 'City' },
                    { name: 'addr1', title: 'Address 1' },
                    { name: 'addr2', title: 'Address 2' },
                    { name: 'state', title: 'State' },
                ],
            }, 
        ]
    });

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
        post_Customer(data)
        .then(() => {
            setSucessSnack('Customer updated successfully')
            
            if (loc.state.from || loc.state.from.pathname)
                hist.push(loc.state.from.pathname);
        })
        .catch((err) => {
            console.log('err =>', err)
            setErrors(err);
        })
    }

    const findRecord = () => {
        console.log('edit.customer_id', props.customer_id)
        get_Customer(props.customer_id)
        .then((result) => {
            setData(result);
        })
    };

    const handleFieldChange = (name, value) => {
        const newData = { ...data }

        if (value && ['cpf', 'phone1', 'phone2'].includes(name)) {
            value = value.replace(/(\D)+/g,'');
        }

        newData[name] = value;
        setData(newData);
    };
    
    useEffect(() => {
        document.title = intl.formatMessage({ id: 'Edit Customer' });
        findRecord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <EnhancedEditForm
            title='Edit Customer'
            fields={fields}
            data={data}
            errors={errors}
            handleFieldChange={handleFieldChange}
            handleCancel={hist.length > 1 ? handleCancel : null}
            handleReset={handleReset}
            handleConfirm={handleConfirm}
        />
    )
};

export default CustomerEdit;