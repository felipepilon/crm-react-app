import React, { Fragment } from 'react';
import { Typography, useTheme, Button, Paper, TextField, CircularProgress } from '@material-ui/core';
import LabelMasks from '../../utils/LabelMasks';
import { FormattedMessage, useIntl } from 'react-intl';
import CallIcon from '@material-ui/icons/Call';
import CallEndIcon from '@material-ui/icons/CallEnd';
import DoneIcon from '@material-ui/icons/Done';
import OnGoingCallTimer from './OnGoingCallTimer';
import PhoneCallFeedback from './PhoneCallFeedback';
import { KeyboardDatePicker } from '@material-ui/pickers';

const PhoneCallPanel = (props) => {
    const theme = useTheme();
    const intl = useIntl();

    const reminder_date = props.state.reminders.length ?
        props.state.reminders[0].reminder_date : null;

    const reminderDateError = 
        props.errors.remiders && 
        props.errors.reminders.length &&
        props.errors.remiders['0'] &&
        props.errors.remiders['0'].reminder_date ?
        props.errors.remiders['0'].reminder_date : null;

    return (
        <Paper style={{ 
            height: '100%',
            padding: theme.spacing(1), 
            boxSizing: 'border-box', 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Typography variant='h5' style={{ margin: theme.spacing(2) }}>
                {LabelMasks.phone(props.customer.phone1)}
            </Typography>
            {
                props.call_status === 'None' ?
                <Button
                    style={{margin: theme.spacing(1)}}
                    endIcon={<CallIcon/>}
                    variant='contained'
                    color='primary'
                    onClick={props.handleStartContact}
                >
                    <FormattedMessage id='Start Call'/>
                </Button> :
                null
            }
            {
                !['Starting', 'None', 'Ending Contact'].includes(props.call_status) ?
                <OnGoingCallTimer
                    call_start_date={props.state.call_start_date}
                    call_end_date={props.state.call_end_date}
                /> :
                null
            }
            {
                props.state.call_status === 'On Going' ?
                <Button
                    variant='contained'
                    color='primary'
                    style={{margin: theme.spacing(1)}}
                    onClick={props.handleEndCall}
                    endIcon={<CallEndIcon/>}
                >
                    <FormattedMessage id='End Call'/>
                </Button> :
                null
            }
            {
                ['On Going', 'Waiting Feedback', 'Ending Call'].includes(props.call_status) ?
                <Fragment>
                    <PhoneCallFeedback
                        feedback={props.state.feedback}
                        another_feedback={props.state.another_feedback}
                        handleFeedbackChange={props.handleFeedbackChange}
                        handleAnotherFeedbackChange={props.handleAnotherFeedbackChange}
                        feedbackError={props.errors.feedback}
                        anotherFeedbackError={props.errors.another_feedback}
                    />
                    <KeyboardDatePicker
                        style={{marginTop: theme.spacing(1)}}
                        label={intl.formatMessage({ id: 'Call Again At' })}
                        value={reminder_date}
                        onChange={(value) => props.handleReminderDateChange(value)}
                        format="dd/MM/yyyy"
                        clearable
                        fullWidth
                        error={reminderDateError ? true : false}
                        helperText={reminderDateError ? intl.formatMessage({id: reminderDateError}) : null}
                        invalidDateMessage={intl.formatMessage({id: 'Invalid date'})}
                    />
                    <TextField
                        style={{marginTop: theme.spacing(2)}}
                        fullWidth
                        multiline
                        rowsMax={4}
                        value={props.state.notes || ''}
                        onChange={(e) => props.handleNotesChange(e.target ? e.target.value : null)}
                        error={props.errors.notes ? true : false}
                        helperText={props.errors.notes ? intl.formatMessage({id: props.errors.notes}) : null}
                        label={intl.formatMessage({id: 'Notes'})}
                    />
                </Fragment> :
                null
            }
            {
                props.call_status === 'Waiting Feedback' ?
                <Button
                    style={{marginTop: theme.spacing(3)}}
                    variant='contained'
                    color='primary'
                    fullWidth
                    endIcon={<DoneIcon/>}
                    onClick={props.handleEndContact}
                >
                    <FormattedMessage id='End Contact'/>
                </Button> :
                null
            }
            {
                ['Starting', 'Ending Call', 'Ending Contact'].includes(props.call_status) ?
                <CircularProgress/> : null
            }
        </Paper>
    );
}
 
export default PhoneCallPanel;