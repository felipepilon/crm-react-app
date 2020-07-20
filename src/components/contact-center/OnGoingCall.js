import React, { Fragment, useState, useEffect } from 'react';
import { Typography, Button, useTheme } from '@material-ui/core';
import { useIntl, FormattedMessage } from 'react-intl';
import LabelMasks from '../../utils/LabelMasks';

const OnGoingCall = (props) => {
    const [ startTime ] = useState(new Date().getTime());
    const [ endTime, setEndTime ] = useState(new Date().getTime());

    const theme = useTheme();

    useEffect(() => {
        setTimeout(() => {
            setEndTime(new Date().getTime());
        }, 1000)
    });

    const timerValue = endTime - startTime;

    return (
        <Fragment>
            <Typography variant='h6' color='secondary' style={{margin: theme.spacing(1)}}>
                {
                    LabelMasks.timer(timerValue)
                }
            </Typography>
            <Button
                variant='contained'
                color='primary'
                style={{margin: theme.spacing(1)}}
            >
                <FormattedMessage id='End'/>
            </Button>
        </Fragment>
    );
}
 
export default OnGoingCall;