import { Paper, Typography, useTheme } from '@material-ui/core';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import BirthdayMessage from './BirthdayMessage';
import Reserves from '../reserves-open/Reserves';
import LoadingAbsoluteBox from '../../components/LoadingAbsoluteBox';

const ContactTopics = ({customer, setReservesLastUpdated, reservesLastUpdate}) => {
    const theme = useTheme();
    const [resLoading, setResLoading] = useState(true);

    return (
        <Paper style={{display: 'flex', width: '100%', padding: theme.spacing(2), flexDirection: 'column', boxSizing: 'border-box', position: 'relative'}}>
            <Typography variant='subtitle1'><FormattedMessage id='Topics'/></Typography>
            <BirthdayMessage customer={customer}/>
            <Reserves 
                customer={customer} 
                setLoading={setResLoading} 
                loading={resLoading} 
                setReservesLastUpdated={setReservesLastUpdated}
                reservesLastUpdate={reservesLastUpdate}
            />
            <LoadingAbsoluteBox loading={resLoading}/>
        </Paper>
    );
}
 
export default ContactTopics;