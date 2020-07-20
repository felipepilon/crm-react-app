import React, { useState } from 'react';
import { Paper, useTheme, Typography, Box } from '@material-ui/core';
import ContactReason from './ContactReason';
import { FormattedMessage } from 'react-intl';
import WhatsAppButton from './WhatsAppButton';
import PhoneCallButton from './PhoneCallButton';
import WhatsAppMsgPanel from './WhatsAppMsgPanel';
import PhoneCallPanel from './PhoneCallPanel';

const ContactCenter = (props) => {
    const [ reasons, setReasons ] = useState([]);
    const [ contactType, setContactType ] = useState('');

    const theme = useTheme();

    const handleWhatsAppButtonClick = () => {
        setContactType('whatsApp');
    }

    const handlePhoneCallButtonClick = () => {
        setContactType('phoneCall');
    }

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
                >
                    <Typography variant='subtitle1' style={{margin: theme.spacing(1)}}><FormattedMessage id='Contact Customer'/></Typography>
                    <ContactReason setReasons={setReasons}/>
                    <Typography variant='body2' style={{margin: theme.spacing(1)}}><FormattedMessage id='Contact Via'/></Typography>
                    <Box display='flex'>
                        <WhatsAppButton handleClick={handleWhatsAppButtonClick} contactType={contactType}/>
                        <PhoneCallButton handleClick={handlePhoneCallButtonClick} contactType={contactType}/>
                    </Box>
                </Box>
                <Box
                    display='flex'
                    width='50%'
                >
                    {
                        contactType ?
                        contactType === 'phoneCall' ?
                        <PhoneCallPanel customer={props.customer}/> :
                        <WhatsAppMsgPanel customer={props.customer}/> :
                        null
                    }
                </Box>
            </Box>
        </Paper>
    );
}
 
export default ContactCenter;