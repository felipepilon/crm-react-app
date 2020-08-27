import React, { useEffect, useContext, useState } from 'react';
import { Box } from '@material-ui/core';
import EnhancedEditForm from './EnhancedEditForm';
import { useIntl } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';
import { AppStateContext } from '../../contexts/AppState';

const EnhancedEditPage = (props) => {
    const { setSucessSnack } = useContext(AppStateContext);

    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    
    const intl = useIntl();
    const hist = useHistory();
    const loc = useLocation();

    const handleCancel = () => {
        setLoading(true);
        hist.goBack();
    };

    const handleConfirm = () => {
        setLoading(true);

        if (props.postValidations) {
            const newErrors = props.postValidations.reduce((errs, valFnc) => {
                const valRes = valFnc(data);
                if (valRes)
                    errs = {...errs, ...valRes};
                return errs;
            }, {});

            if (Object.keys(newErrors).length) {
                setErrors(newErrors);
                setLoading(false);
                return;
            }
        }

        props.postFnc(data)
        .then(() => {
            setTimeout(() => {
                setSucessSnack(props._new ? 'Record added successfully' : 'Record updated successfully')
                if (loc.state && loc.state.from && loc.state.from.pathname)
                    hist.push(loc.state.from.pathname);
                else
                    handleReset();
            }, 500);
        })
        .catch((err) => {
            setErrors(err);
            setTimeout(() => {
                setLoading(false);
            }, 500);
        })
    }

    const handleFieldChange = (name, value) => {
        if (props.beforeFieldChanges && props.beforeFieldChanges[name])
            value = props.beforeFieldChanges[name](value);

        setData({...data, ...{[name]: value || null}});
    };
    
    const handleReset = () => {
        setLoading(true);

        if (!props._new)
            findRecord();
        else {
            setData({});
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    };

    const findRecord = () => {
        props.findRecordFnc(props.findParams)
        .then((result) => {
            setData(result);
            setTimeout(() => {
                setLoading(false);
            }, 500);
        })
    };

    useEffect(() => {
        document.title = intl.formatMessage({ id: props.title });

        if (!props._new)
            findRecord();
        else
            setTimeout(() => {
                setLoading(false);
            }, 500);
    // eslint-disable-next-line
    }, [])

    return (
        <Box
            display='flex'
            maxWidth='100%'
            justifyContent='center'
            padding={3}
        >
            <EnhancedEditForm
                title={props.title}
                fields={props.fields}
                data={data}
                errors={errors}
                handleFieldChange={handleFieldChange}
                handleCancel={hist.length > 1 ? handleCancel : null}
                handleReset={handleReset}
                handleConfirm={handleConfirm}
                loading={loading}
            />
        </Box>
    )
}
 
export default EnhancedEditPage;