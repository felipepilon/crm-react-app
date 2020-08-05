import React, { useEffect, useState, Fragment } from 'react';
import { Typography, useTheme, Button, Paper, CircularProgress, TextField, Box, Checkbox, FormControlLabel } from '@material-ui/core';
import LabelMasks from '../../utils/LabelMasks';
import { FormattedMessage, useIntl } from 'react-intl';
import { msgPreset as getMsgPresetApi } from '../../services/Contact';
import SendIcon from '@material-ui/icons/Send';
import DoneIcon from '@material-ui/icons/Done';
import { 
    add as addContactApi,
    addInteractions as addInteractionsApi,
} from '../../services/Contact';
import ContactFeedback from './ContactFeedback';
import { KeyboardDatePicker } from '@material-ui/pickers';

const WhatsAppMsgPanel = (props) => {
    const [ panelState, setPanelState ] = useState({
        status: 'Starting',
        open_whatsapp: true,
    });
    const [ errors, setErrors ] = useState({});
    const [ loading, setLoading ] = useState(true);

    const theme = useTheme();
    const intl = useIntl();

    const handleStatusChange = (status) => setPanelState({ ...panelState, ...{status}, });

    const handleOpenWhatsAppChange = (open_whatsapp) => setPanelState({ ...panelState, ...{open_whatsapp}, });

    const handleOutMsgChange = (out_msg) => setPanelState({ ...panelState, ...{out_msg}, });

    const handleFeedbackChange = (feedback) => setPanelState({ ...panelState, ...{feedback}, });

    const handleAnotherFeedbackChange = (another_feedback) => setPanelState({ ...panelState, ...{another_feedback}, });
    
    const handleReminderDateChange = (reminder_date) => setPanelState({ ...panelState, ...{reminder_date}, });

    const handleNotesChange = (notes) => setPanelState({ ...panelState, ...{notes}, });

    const contact_reason = props.contact.reasons ?
        props.contact.reasons.split(', ')[0] : null;

    useEffect(() => {
        setLoading(true);

        if (contact_reason) {
            setTimeout(() => {
                getMsgPresetApi({
                    contact_via: props.contactVia,
                    contact_reason,
                })
                .then((result) => {
                    setPanelState({ 
                        ...panelState,
                        ...{
                            status: 'Ready To Send',
                            out_msg: result && result.text ? result.text : null,
                        }, 
                    });
                    setLoading(false);
                })
            }, 1000)
        } else {
            setPanelState({ 
                ...panelState,
                ...{
                    status: 'Ready To Send',
                    out_msg: null,
                }, 
            });
            setLoading(false);
        }
    // eslint-disable-next-line
    }, [contact_reason]);
    
    useEffect(() => {
        const {feedback, ...other} = errors;
        if (feedback)
            setErrors(other);
    // eslint-disable-next-line
    }, [panelState.feedback]);

    useEffect(() => {
        const {another_feedback, ...other} = errors;
        if (another_feedback)
            setErrors(other);
    // eslint-disable-next-line
    }, [panelState.another_feedback]);

    useEffect(() => {
        const {reminder_date, ...other} = errors;
        if (reminder_date)
            setErrors(other);
    // eslint-disable-next-line
    }, [panelState.reminder_date]);

    useEffect(() => {
        const {notes, ...other} = errors;
        if (notes)
            setErrors(other);
    // eslint-disable-next-line
    }, [panelState.notes]);

    const handleSendMsg = (e) => {
        e.preventDefault();
        setLoading(true);

        const newErrors = {};
     
        if (!panelState.out_msg)
            newErrors.out_msg = 'Inform a message';

        setErrors(newErrors);

        if (Object.keys(newErrors).length) {
            setLoading(false);
            return;
        }

        let text = panelState.out_msg.replace(/\n/g,'%0A');
        const href = `https://api.whatsapp.com/send?phone=55${props.customer.phone1}&text=${text}`;

        if (!props.contact.contact_id) {
            const newInter = {
                contact_via: props.contactVia,
                interaction_type: 'Message Sent',
                interaction_text: 'Sent: {t1}',
                interaction_date: new Date(),
                t1: panelState.out_msg,
            };

            let newContact = { 
                ...props.contact,
                ...{ 
                    status: 'Started',
                    contact_start_date: new Date(),
                }
            };
    
            props.setContact(newContact);

            setTimeout(() => {
                addContactApi({
                    ...newContact,
                    ...{
                        interactions: [newInter],
                    }
                })
                .then((result) => {
                    newContact = { 
                        ...newContact,
                        ...{ 
                            contact_id: result.contact_id,
                            interactions: result.interactions,
                        }
                    };
    
                    props.setContact(newContact);

                    handleStatusChange('Waiting Feedback')

                    if (panelState.open_whatsapp)
                        window.open(href, '_blank');

                    setLoading(false);
                })
            }, 1000);
        } else {
            const newInter = {
                contact_id: props.contact.contact_id,
                contact_via: props.contactVia,
                interaction_type: 'Message Sent',
                interaction_text: 'Sent: {t1}',
                interaction_date: new Date(),
                t1: panelState.out_msg,
            };

            setTimeout(() => {
                 addInteractionsApi([newInter])
                .then((result) => {
                    props.setContact({
                        ...props.contact,
                        ...{
                            interactions: [
                                ...props.contact.interactions,
                                ...result,
                            ]
                        }
                    });    
    
                    handleStatusChange('Waiting Feedback')

                    if (panelState.open_whatsapp)
                        window.open(href, '_blank');

                    setLoading(false);
                })
            }, 1000);
        }
    }

    const handleEndContact = (e) => {
        e.preventDefault();
        setLoading(true);

        const newErrors = {};
     
        if (!panelState.feedback)
            newErrors.feedback = 'Inform a feedback';

        if (['Another', 'Replied'].includes(panelState.feedback) && !panelState.another_feedback)
            newErrors.another_feedback = 'Provide details';

        setErrors(newErrors);

        if (Object.keys(newErrors).length) {
            setLoading(false);
            return;
        }

        const newInters = [];

        newInters.push({
            contact_id: props.contact.contact_id,
            contact_via: props.contactVia,
            interaction_type: 'Feedback',
            interaction_text: 'Feedback: {t1}',
            interaction_date: new Date(),
            t1: ['Another', 'Replied'].includes(panelState.feedback) ? 
                panelState.another_feedback :
                intl.formatMessage({id: panelState.feedback}),
        });

        if (panelState.reminder_date) {
            newInters.push({
                contact_id: props.contact.contact_id,
                contact_via: props.contactVia,
                interaction_type: 'Reminders',
                interaction_text: 'Remind customer at: {t1}',
                interaction_date: new Date(),
                t1: intl.formatDate(panelState.reminder_date),
            });
        }

        if (panelState.notes) {
            newInters.push({
                contact_id: props.contact.contact_id,
                contact_via: props.contactVia,
                interaction_type: 'Notes',
                interaction_text: 'Contact notes: {t1}',
                interaction_date: new Date(),
                t1: panelState.notes,
            });
        }

        setTimeout(() => {
            addInteractionsApi(newInters).then(() => props.handleEndContact());
        }, 1000);
    }


    useEffect(() => {
        if (errors.out_msg)
            setErrors({ ...errors, ...{out_msg: null}});
    // eslint-disable-next-line
    }, [panelState.out_msg])

    return (
        <Paper style={{ 
            height: '100%',
            padding: theme.spacing(1), 
            boxSizing: 'border-box', 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
        }}>
            <Typography variant='h5' style={{ margin: theme.spacing(2) }}>
                {LabelMasks.phone(props.customer.phone1)}
            </Typography>
            {
                panelState.status === 'Ready To Send' ?
                <Fragment>
                    <TextField
                        multiline
                        fullWidth
                        variant='outlined'
                        size='small'
                        rowsMax={4}
                        value={panelState.out_msg || ''}
                        onChange={(e) => handleOutMsgChange(e.target ? e.target.value : null)}
                        label={intl.formatMessage({id: 'Send Message'})}
                        error={errors.out_msg ? true : false}
                        helperText={errors.out_msg ? intl.formatMessage({id: errors.out_msg}) : null}
                    />
                    <Box display='flex' justifyContent='flex-end' alignItems='center'  width='100%' marginTop={1}>
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    checked={panelState.open_whatsapp} 
                                    onChange={() => handleOpenWhatsAppChange(!panelState.open_whatsapp)}
                                    color='primary'
                                />
                            }
                            label={intl.formatMessage({id: 'Open WhatsApp'})}
                        />
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={handleSendMsg}
                            endIcon={<SendIcon/>}
                        >
                            <FormattedMessage id='Send'/>
                        </Button>
                    </Box>
                </Fragment> :
                null
            }
            {
                panelState.status === 'Waiting Feedback' ?
                <Fragment>
                    <Typography variant='body2'>
                        <FormattedMessage id='You send: {out_msg}' values={panelState}/>
                    </Typography>
                    <ContactFeedback
                        feedback={panelState.feedback}
                        another_feedback={panelState.another_feedback}
                        handleFeedbackChange={handleFeedbackChange}
                        handleAnotherFeedbackChange={handleAnotherFeedbackChange}
                        feedbackError={errors.feedback}
                        anotherFeedbackError={errors.another_feedback}
                        contactVia={props.contactVia}
                    />
                    <KeyboardDatePicker
                        style={{marginTop: theme.spacing(1)}}
                        label={intl.formatMessage({ id: 'Call Again At' })}
                        value={panelState.reminder_date || null}
                        onChange={(value) => handleReminderDateChange(value)}
                        format="dd/MM/yyyy"
                        clearable
                        fullWidth
                        error={errors.reminder_date ? true : false}
                        helperText={errors.reminder_date ? intl.formatMessage({id: errors.reminder_date}) : null}
                        invalidDateMessage={intl.formatMessage({id: 'Invalid date'})}
                    />
                    <TextField
                        style={{marginTop: theme.spacing(2)}}
                        fullWidth
                        multiline
                        rowsMax={4}
                        value={panelState.notes || ''}
                        onChange={(e) => handleNotesChange(e.target ? e.target.value : null)}
                        error={errors.notes ? true : false}
                        helperText={errors.notes ? intl.formatMessage({id: errors.notes}) : null}
                        label={intl.formatMessage({id: 'Notes'})}
                    />
                    <Button
                        style={{marginTop: theme.spacing(3)}}
                        variant='contained'
                        color='primary'
                        fullWidth
                        endIcon={<DoneIcon/>}
                        onClick={handleEndContact}
                    >
                        <FormattedMessage id='End Contact'/>
                    </Button>
                </Fragment> : 
                null
            }
            {
                loading ?
                <Box
                    display='flex'
                    position='absolute'
                    height='100%'
                    width='100%'
                    justifyContent='center'
                    alignItems='center'
                    bgcolor={theme.palette.background.paper}
                    zIndex='1'
                >
                    <CircularProgress/>
                </Box> : 
                null
            }
        </Paper>
    );
}
 
export default WhatsAppMsgPanel;