import React, { useContext, useEffect, useState } from 'react';
import { 
    post_User,
} from '../../services/User';
import EditDialogWrapper from '../../components/edit-page/EditDialogWrapper';
import PageField from '../../components/edit-page/PageField';
import FieldGroupWrapper from '../../components/edit-page/FieldGroupWrapper';
import { AppStateContext } from '../../contexts/AppState';
import EditPageButton from '../../components/edit-page/EditPageButton';
import ButtonsWrapper from '../../components/edit-page/ButtonsWrapper';

const UserEditDialog = ({handleUpdated, open, handleClose}) => {
    const { setSucessSnack } = useContext(AppStateContext);
    
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    const handleFieldChange = (fieldKey, newValue) => setData({...data, ...{[fieldKey]: newValue}});

    const handleCancel = () => {
        handleClose();
    }

    const handleReset = () => {
        setLoading(true);

        setData({});
        setErrors({});
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }

    const handleConfirm = () => {
        setLoading(true);

        console.log('post', data)
        post_User(data)
        .then(() => {
            setSucessSnack('Record updated successfully');
            handleUpdated();
            handleClose();
        })
        .catch((err) => {
            setErrors(err);
            setLoading(false);
        })
    }
    
    return (
        <EditDialogWrapper title='Add User' loading={loading} open={open} handleClose={handleClose}>
            <FieldGroupWrapper>
                <PageField fieldKey='first_name' title='First Name' value={data.first_name} error={errors.first_name} handleChange={handleFieldChange}/>
                <PageField fieldKey='last_name' title='Last Name' value={data.last_name} error={errors.last_name} handleChange={handleFieldChange}/>
                <PageField fieldKey='email' title='Email' value={data.email} error={errors.email} handleChange={handleFieldChange}/>
                <PageField fieldKey='password' title='Password' value={data.password} error={errors.password} handleChange={handleFieldChange}/>
                <PageField fieldKey='role' title='Role' value={data.role} error={errors.role} handleChange={handleFieldChange} 
                    comp='select'
                    options={['Connector', 'Sys Admin', 'Manager', 'Salesman']}
                />
            </FieldGroupWrapper>
            <ButtonsWrapper>
                <EditPageButton title='Cancel' handleClick={handleCancel} marginRight={1}/>
                <EditPageButton title='Reset' handleClick={handleReset} marginRight={1}/>
                <EditPageButton title='Confirm' handleClick={handleConfirm} color='primary'/>
            </ButtonsWrapper>
        </EditDialogWrapper>
    )
};

export default UserEditDialog;