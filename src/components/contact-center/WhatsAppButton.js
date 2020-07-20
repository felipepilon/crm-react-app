import React from 'react';
import { Button, useTheme } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

const WhatsAppButton = (props) => {
    const theme = useTheme();

    const handleClick = (e) => {
        e.preventDefault();
        props.handleClick();
    }

    const disabled = props.contactType === 'whatsApp';

    return (
        <Button variant='contained' color='primary' 
            style={{ margin: theme.spacing(1), width: '50%' }}
            endIcon={<WhatsAppIcon/>}
            onClick={handleClick}
            size='small'
            disabled={disabled}
        >
            <FormattedMessage id='WhatsApp'/>
        </Button>
    );
}
 
export default WhatsAppButton;