import { Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import AgendaWrapper from './AgendaWrapper';
import Birthdays from './Birthdays';
import Reserves from './Reserves';

const Agenda = () => {
    return (
        <AgendaWrapper>
            <Typography variant='subtitle1'><FormattedMessage id='Agenda'/></Typography>
            <Birthdays/>
            <Reserves/>
        </AgendaWrapper>
    );
}
 
export default Agenda;