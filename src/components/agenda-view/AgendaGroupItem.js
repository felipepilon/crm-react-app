import { Box, IconButton, Link, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';

const AgendaGroupItem = ({customer}) => {
    const loc = useLocation();

    const to = `${loc.pathname}/customers/view/${customer.customer_id}`;

    return (
        <Link component={RouterLink} to={to}>
            <Box display='flex' alignItems='center' width='100%'>
                <Typography style={{flex: '1'}} variant='body2'><FormattedMessage id={customer.name}/></Typography>
                <IconButton size='small'>
                    {
                        customer.contact_count ? <CheckIcon/> : <ContactPhoneIcon/>
                    }
                </IconButton>
            </Box>
        </Link>
    );
}
 
export default AgendaGroupItem;