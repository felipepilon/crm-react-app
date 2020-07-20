import React from 'react';
import { Button, useTheme } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import PhoneIcon from '@material-ui/icons/Phone';

const PhoneCallButton = (props) => {
    const theme = useTheme();

    const handleClick = (e) => {
        e.preventDefault();
        props.handleClick();
    }

    const disabled = props.contactType === 'phoneCall';

    return (
        <Button variant='contained' color='primary' 
            style={{ margin: theme.spacing(1), width: '50%' }}
            endIcon={<PhoneIcon/>}
            onClick={handleClick}
            size='small'
            disabled={disabled}
        >
            <FormattedMessage id='Phone'/>
        </Button>
    );
}
 
export default PhoneCallButton;