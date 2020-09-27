import { Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import AgendaWrapper from './AgendaWrapper';
import Birthdays from './Birthdays';

const Agenda = () => {
    return (
        <AgendaWrapper>
            <Typography variant='subtitle1'><FormattedMessage id='Agenda'/></Typography>
            <Birthdays/>
        </AgendaWrapper>
    );
}
 
export default Agenda;