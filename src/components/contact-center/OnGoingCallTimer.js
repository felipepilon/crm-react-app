import React, { useEffect, useState } from 'react';
import { Typography, useTheme } from '@material-ui/core';
import LabelMasks from '../../utils/LabelMasks';

const OnGoingCallTimer = (props) => {
    const theme = useTheme();
    const [ currentDate, setCurrentDate ] = useState(new Date());
    
    useEffect(() => {
        if (!props.call_end_date)
        {
            setTimeout(() => {
                setCurrentDate(new Date());
            }, 1000)
        }
    // eslint-disable-next-line
    }, [props.call_end_date, currentDate]);

    const timerValue = props.call_start_date ?
        ((props.call_end_date && props.call_end_date.getTime()) || currentDate.getTime()) - props.call_start_date.getTime() :
        0;

    return (
        <Typography variant='h6' style={{margin: theme.spacing(1)}} >
            {
                LabelMasks.timer(timerValue / 1000)
            }
        </Typography>
    );
}
 
export default OnGoingCallTimer;