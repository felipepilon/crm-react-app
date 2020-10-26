import React, { useContext, useEffect, useState } from 'react';
import { post_ContactReason } from '../../services/ContactReason';
import EditDialogWrapper from '../../components/edit-page/EditDialogWrapper';
import PageField from '../../components/edit-page/PageField';
import FieldGroupWrapper from '../../components/edit-page/FieldGroupWrapper';
import { AppStateContext } from '../../contexts/AppState';
import EditPageButton from '../../components/edit-page/EditPageButton';
import ButtonsWrapper from '../../components/edit-page/ButtonsWrapper';
import { get_StoreGroups } from '../../services/StoreGroup';

const ContactReasonAddDialog = ({handleUpdated, open, handleClose}) => {
    const { setSucessSnack } = useContext(AppStateContext);
    
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        active: true
    });

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

        setData({
            active: true
        });
        setErrors({});
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }

    const handleConfirm = () => {
        setLoading(true);

        post_ContactReason(data)
        .then(() => {
            setSucessSnack('Record added successfully');
            handleUpdated();
            handleClose();
        })
        .catch((err) => {
            setErrors(err);
            setLoading(false);
        })
    }
    
    return (
        <EditDialogWrapper title='New Contact Reason' loading={loading} open={open} handleClose={handleClose}>
            <FieldGroupWrapper>
                <PageField fieldKey='store_group_id' title='Store Group' value={data.store_group_id} error={errors.store_group_id} handleChange={handleFieldChange}
                    comp='select'
                    loadOptionsFnc={get_StoreGroups}
                    optionLabel='name'
                />
                <PageField fieldKey='reason_description' title='Description' value={data.reason_description} error={errors.reason_description} handleChange={handleFieldChange}/>
                <PageField fieldKey='reason_type' title='Reason Type' value={data.reason_type} error={errors.reason_type} handleChange={handleFieldChange} 
                    comp='select'
                    options={['Reserve', 'Birthday', 'Another', 'Custom']}
                />
                <PageField fieldKey='active' title='Active' value={data.active} error={errors.active} handleChange={handleFieldChange} comp='checkbox'/>
            </FieldGroupWrapper>
            <ButtonsWrapper>
                <EditPageButton title='Cancel' handleClick={handleCancel} marginRight={1}/>
                <EditPageButton title='Reset' handleClick={handleReset} marginRight={1}/>
                <EditPageButton title='Confirm' handleClick={handleConfirm} color='primary'/>
            </ButtonsWrapper>
        </EditDialogWrapper>
    )
};

export default ContactReasonAddDialog;