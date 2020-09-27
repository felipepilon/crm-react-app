import React, { Fragment, useState, useEffect } from 'react';
import { Typography, useTheme, Button, Paper, TextField, CircularProgress, Box } from '@material-ui/core';
import LabelMasks from '../../utils/LabelMasks';
import { FormattedMessage, useIntl } from 'react-intl';
import CallIcon from '@material-ui/icons/Call';
import CallEndIcon from '@material-ui/icons/CallEnd';
import DoneIcon from '@material-ui/icons/Done';
import OnGoingCallTimer from './OnGoingCallTimer';
import ContactFeedback from './ContactFeedback';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { 
    post_Contact,
    post_Interactions,
} from '../../services/Contact';

const PhoneCallPanel = (props) => {
    const [ panelState, setPanelState ] = useState({
        status: 'New',
    });
    const [ errors, setErrors ] = useState({});
    const [ loading, setLoading ] = useState(true);

    const theme = useTheme();
    const intl = useIntl();

    const handleFeedbackChange = (feedback) => setPanelState({ ...panelState, ...{feedback}, });

    const handleAnotherFeedbackChange = (another_feedback) => setPanelState({ ...panelState, ...{another_feedback}, });

    const handleReminderDateChange = (reminder_date) => setPanelState({ ...panelState, ...{reminder_date}, });

    const handleNotesChange = (notes) => setPanelState({ ...panelState, ...{notes}, });

    useEffect(() => {
        setLoading(false);
    // eslint-disable-next-line
    }, [])

    const handleStartCall = () => {
        setLoading(true);
        
        const newInter = {
            contact_via: props.contactVia,
            interaction_type: 'Call Started',
            interaction_text: 'Call started at: {t1}',
            interaction_date: new Date(),
            t1: `${intl.formatDate(new Date())} ${intl.formatTime(new Date())}`
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
            post_Contact({
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
                setPanelState({
                    ...panelState,
                    ...{
                        status: 'On Going',
                        start_date: newInter.interaction_date,
                    }
                });
                setLoading(false);
            })
        }, 1000);
    }

    const handleEndCall = () => {
        setLoading(true);

        const newInter = {
            contact_id: props.contact.contact_id,
            contact_via: props.contactVia,
            interaction_type: 'Call Ended',
            interaction_text: 'Call ended at: {t1}',
            interaction_date: new Date(),
            t1: `${intl.formatDate(new Date())} ${intl.formatTime(new Date())}`
        }

        let newPanelState = {
            ...panelState,
            ...{
                end_date: newInter.interaction_date,
            }
        };

        setPanelState(newPanelState);

        setTimeout(() => {
            post_Interactions([newInter])
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

                newPanelState = {
                    ...newPanelState,
                    ...{
                        status: 'Waiting Feedback',
                    }
                };

                setPanelState(newPanelState);
                setLoading(false);
            });
        }, 1000)
    }

    const handleEndContact = () => {
        const newErrors = {};
     
        if (!panelState.feedback)
            newErrors.feedback = 'Inform a feedback';

        if (panelState.feedback === 'Another' && !panelState.another_feedback)
            newErrors.another_feedback = 'Provide details';

        setErrors(newErrors);

        if (Object.keys(newErrors).length) {
            setLoading(false);
            return;
        }

        const newInters = [];

        setLoading(true);

        if (panelState.feedback) {
            newInters.push({
                contact_id: props.contact.contact_id,
                contact_via: props.contactVia,
                interaction_type: 'Feedback',
                interaction_text: 'Feedback: {t1}',
                interaction_date: new Date(),
                t1: panelState.feedback === 'Another' ? 
                    panelState.another_feedback :
                    intl.formatMessage({id: panelState.feedback}),
            });
        }

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
            if (newInters.length)
                post_Interactions(newInters).then(() => props.handleEndContact());
            else 
                props.handleEndContact();
        }, 1000);
    }

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
                panelState.status === 'New' ?
                <Button
                    style={{margin: theme.spacing(1)}}
                    endIcon={<CallIcon/>}
                    variant='contained'
                    color='primary'
                    onClick={handleStartCall}
                >
                    <FormattedMessage id='Start Call'/>
                </Button> :
                null
            }
            {
                ['On Going', 'Waiting Feedback'].includes(panelState.status) ?
                <OnGoingCallTimer
                    start_date={panelState.start_date}
                    end_date={panelState.end_date}
                /> :
                null
            }
            {
                panelState.status === 'On Going' ?
                <Button
                    variant='contained'
                    color='primary'
                    style={{margin: theme.spacing(1)}}
                    onClick={handleEndCall}
                    endIcon={<CallEndIcon/>}
                >
                    <FormattedMessage id='End Call'/>
                </Button> :
                null
            }
            {
                ['On Going', 'Waiting Feedback'].includes(panelState.status) ?
                <Fragment>
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
                </Fragment> :
                null
            }
            {
                panelState.status === 'Waiting Feedback' ?
                <Button
                    style={{marginTop: theme.spacing(3)}}
                    variant='contained'
                    color='primary'
                    fullWidth
                    endIcon={<DoneIcon/>}
                    onClick={handleEndContact}
                >
                    <FormattedMessage id='End Contact'/>
                </Button> :
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
 
export default PhoneCallPanel;