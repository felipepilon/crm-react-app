import React, { useState, useEffect, useContext } from 'react';
import { Paper, useTheme, Typography, Box } from '@material-ui/core';
import ContactReason from './ContactReason';
import { FormattedMessage } from 'react-intl';
import WhatsAppButton from './WhatsAppButton';
import PhoneCallButton from './PhoneCallButton';
import WhatsAppMsgPanel from './WhatsAppMsgPanel';
import PhoneCallPanel from './PhoneCallPanel';
import StoreSelect from '../fields/StoreSelect';
import SalesmanSelect from '../fields/SalesmanSelect';
import { 
    add as addContactApi,
    update as updateContactApi,
} from '../../services/Contact';
import { AppStateContext } from '../../contexts/AppState';

const ContactCenter = (props) => {
    const { setSucessSnack } = useContext(AppStateContext);

    const [ state, setState ] = useState({
        status: 'New',
        store_group_id: props.customer.store_group_id,
        customer_id: props.customer.customer_id,
        store_id: null,
        salesman_id: null,
        contact_via: null,
        reasons: [],
        another_reason: null,
        contact_start_date: null,
        call_start_date: null,
        call_end_date: null,
        call_status: 'None',
        feedback: null,
        another_feedback: null,
        notes: null,
        reminders: [],
    })
    const [ errors, setErrors ] = useState({});

    const theme = useTheme();

    const handleWhatsAppButtonClick = () => handleContactViaSelected('WhatsApp');

    const handlePhoneCallButtonClick = () => handleContactViaSelected('Phone Call');

    const handleContactViaSelected = (contact_via) => {
        let newErrors = {}

        if (!state.store_id)
            newErrors.store_id = 'Select a store';

        if (!state.salesman_id)
            newErrors.salesman_id = 'Select a salesman';

        if (!state.reasons.length)
            newErrors.reasons = { h: 'At least one reason is required' };

        if (state.reasons.find((rsn) => rsn.reason === 'another')) {
            if (!state.another_reason || !state.another_reason.trim().length)
                newErrors.another_reason = 'Inform details for the contact';
            else if (state.another_reason.trim().length < 5)
            newErrors.another_reason = 'It must have at least 5 digits';
        }

        setErrors(newErrors);
        
        if (!Object.keys(newErrors).length)
            setState({
                ...state,
                ...{contact_via},
            });
    }

    const handleSalesmanIdChange = (salesman_id) => setState({ ...state, ...{salesman_id}, });

    const handleStoreIdChange = (store_id) => setState({ ...state, ...{store_id}, });

    const handleReasonsChange = (reasons) => setState({ ...state, ...{reasons}, });

    const handleAnotherReasonChange = (another_reason) => setState({ ...state, ...{another_reason}, });

    const handleFeedbackChange = (feedback) => setState({ ...state, ...{feedback}, });

    const handleAnotherFeedbackChange = (another_feedback) => setState({ ...state, ...{another_feedback}, });

    const handleNotesChange = (notes) => setState({ ...state, ...{notes}, });

    const handleReminderDateChange = (reminder_date) => setState({ 
        ...state, 
        ...{reminders: reminder_date ? [ {reminder_date} ] : [] }, 
    });;

    const handleStartContact = () => {
        let newState = { 
            ...state,
            ...{ 
                status: 'Started',
                call_status: 'Starting',
                contact_start_date: new Date(),
                call_start_date: state.contact_via === 'Phone Call' ? new Date() : null,
            }
        };

        setState(newState)

        setTimeout(() => {
            addContactApi(newState)
            .then((result) => {
                newState = { 
                    ...newState,
                    ...{ 
                        contact_id: result.contact_id,
                        call_status: 'On Going',
                    }
                };

                setState(newState)
            })
        }, 500)
    }

    const handleEndCall = () => {
        let newState = {
            ...state,
            ...{
                call_status: 'Ending Call',
            },
        };

        setState(newState);

        setTimeout(() => {
            newState = {
                ...newState,
                ...{
                    call_status: 'Waiting Feedback',
                    call_end_date: new Date(),
                }
            }

            updateContactApi({
                contact_id: newState.contact_id,
                call_end_date: newState.call_end_date,
            })
            .then(() => {
                setState(newState);
            })
        }, 500)
    }

    const handleEndContact = () => {
        let newState = {
            ...state,
            ...{
                call_status: 'Ending Contact',
            },
        };

        setState(newState);

        setTimeout(() => {
            newState = {
                ...newState,
                ...{
                    status: 'Completed',
                    call_status: 'None',
                    contact_end_date: new Date(),
                }
            }

            updateContactApi({
                contact_id: newState.contact_id,
                status: newState.status,
                contact_end_date: newState.contact_end_date,
                feedback: newState.feedback,
                another_feedback: newState.another_feedback,
                notes: newState.notes,
                reminders: newState.reminders,
            })
            .then(() => {
                newState = {
                    ...newState,
                    ...{
                        contact_id: null,
                        status: 'New',
                        contact_via: null,
                        reasons: [],
                        another_reason: null,
                        contact_start_date: null,
                        call_start_date: null,
                        call_end_date: null,
                        call_status: 'None',
                        feedback: null,
                        another_feedback: null,
                        notes: null,
                        reminders: [],
                    }
                };

                setState(newState);
                props.setContactsLastUpdate(new Date());
                setSucessSnack('Contacted registered successully');
            })
        }, 500)
    }

    useEffect(() => {
        const {salesman_id, ...other} = errors;
        if (salesman_id)
            setErrors(other);
    // eslint-disable-next-line
    }, [state.salesman_id])

    useEffect(() => {
        const {reasons, ...other} = errors;
        if (reasons)
            setErrors(other);
    // eslint-disable-next-line
    }, [state.reasons])

    useEffect(() => {
        const {another_reason, ...other} = errors;
        if (another_reason)
            setErrors(other);
    // eslint-disable-next-line
    }, [state.another_reason])

    const disabled = state.status !== 'New';

    return (
        <Paper style={{ height: '100%', padding: theme.spacing(1), boxSizing: 'border-box' }}>
            <Box
                display='flex'
                width='100%'
                height='100%'
            >
                <Box
                    display='flex'
                    flexDirection='column'
                    width='50%'
                    position='relative'
                    margin={1}
                >
                    <Typography variant='subtitle1'><FormattedMessage id='Contact Customer'/></Typography>
                    <StoreSelect
                        store_id={state.store_id}
                        error={errors.store_id}
                        handleStoreIdChange={handleStoreIdChange}
                        disabled={disabled}
                    />
                    <SalesmanSelect
                        store_id={state.store_id}
                        salesman_id={state.salesman_id}
                        error={errors.salesman_id}
                        handleSalesmanIdChange={handleSalesmanIdChange}
                        disabled={disabled}
                    />
                    <ContactReason 
                        reasons={state.reasons}
                        another_reason={state.another_reason}
                        reasonError={errors.reasons && errors.reasons.h}
                        anotherReasonError={errors.another_reason}
                        handleReasonsChange={handleReasonsChange}
                        handleAnotherReasonChange={handleAnotherReasonChange}
                        disabled={disabled}
                    />
                    <Typography 
                        variant='body2' 
                        style={{
                            marginTop: theme.spacing(2),
                            color: disabled ? theme.palette.text.disabled : null
                        }}
                    >
                        <FormattedMessage id='Contact Via'/>
                    </Typography>
                    <Box display='flex'>
                        <WhatsAppButton 
                            handleClick={handleWhatsAppButtonClick} 
                            contact_via={state.contact_via}
                            disabled={disabled}    
                        />
                        <PhoneCallButton 
                            handleClick={handlePhoneCallButtonClick} 
                            contact_via={state.contact_via}
                            disabled={disabled}    
                        />
                    </Box>
                </Box>
                <Box
                    flex='1'
                >
                    {
                        state.contact_via ?
                        state.contact_via === 'Phone Call' ?
                        <PhoneCallPanel 
                            customer={props.customer} 
                            state={state}
                            errors={errors}
                            call_status={state.call_status}
                            handleStartContact={handleStartContact}
                            handleEndCall={handleEndCall}
                            handleFeedbackChange={handleFeedbackChange}
                            handleAnotherFeedbackChange={handleAnotherFeedbackChange}
                            handleNotesChange={handleNotesChange}
                            handleReminderDateChange={handleReminderDateChange}
                            handleEndContact={handleEndContact}
                        /> :
                        <WhatsAppMsgPanel customer={props.customer} state={state}/> :
                        null
                    }
                </Box>
            </Box>
        </Paper>
    );
}
 
export default ContactCenter;