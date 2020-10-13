import React, { useContext, useEffect, useState } from 'react';
import { post_ConnUser } from '../../services/ConnUser';
import { get_ConnJobProfiles } from '../../services/ConnJobProfiles';
import EditDialogWrapper from '../../components/edit-page/EditDialogWrapper';
import PageField from '../../components/edit-page/PageField';
import FieldGroupWrapper from '../../components/edit-page/FieldGroupWrapper';
import { AppStateContext } from '../../contexts/AppState';
import EditPageButton from '../../components/edit-page/EditPageButton';
import ButtonsWrapper from '../../components/edit-page/ButtonsWrapper';
import { get_Users, get_ConnUser } from '../../services/User';
import ConnectorKeyGenerator from '../../components/edit-page/ConnectorKeyGenerator';

const AccessTokenDialog = ({user_id, handleUpdated, open, handleClose}) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, [user_id]);

    const handleExit = () => {
        handleClose();
    }

    return (
        <EditDialogWrapper title='Access Token' loading={loading} open={open} handleClose={handleClose}>
            <FieldGroupWrapper>
                <ConnectorKeyGenerator user_id={user_id}/>
            </FieldGroupWrapper>
            <ButtonsWrapper>
                <EditPageButton title='Sair' handleClick={handleExit} marginRight={1}/>
            </ButtonsWrapper>
        </EditDialogWrapper>
    )
};

export default AccessTokenDialog;