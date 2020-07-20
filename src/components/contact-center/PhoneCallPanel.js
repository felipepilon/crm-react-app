import React, { useState } from 'react';
import { Typography, Box, useTheme, Button } from '@material-ui/core';
import LabelMasks from '../../utils/LabelMasks';
import { FormattedMessage } from 'react-intl';
import CallIcon from '@material-ui/icons/Call';
import OnGoingCall from './OnGoingCall';

const PhoneCallPanel = (props) => {
    const [ callStatus, setCallStatus ] = useState('none');

    const theme = useTheme();

    const handleStartCallClick = (e) => {
        e.preventDefault();
        setCallStatus('onGoing')
    }

    return (
        <Box
            display='flex'
            flexDirection='column'
            width='100%'
            alignItems='center'
        >
            <Typography variant='h6' style={{marginBottom: theme.spacing(1), marginTop: theme.spacing(8)}}>
                {LabelMasks.phone([props.customer.phone1])}
            </Typography>
            {
                callStatus === 'none' ?
                <Button
                    style={{ margin: theme.spacing(1) }}
                    endIcon={<CallIcon/>}
                    variant='contained'
                    color='primary'
                    onClick={handleStartCallClick}
                >
                    <FormattedMessage id='Start Call'/>
                </Button> :
                null
            }
            {
                callStatus === 'onGoing' ?
                <OnGoingCall/> :
                null
            }
        </Box>
    );
}
 
export default PhoneCallPanel;