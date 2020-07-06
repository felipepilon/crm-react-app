import React from 'react';
import { Typography, makeStyles, Paper, Box } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import ReserveCustomerData from './ReserveCustomerData';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    },
}));

const ReserveCustomerShow = (props) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Box
                display='flex'
                justifyContent='center'
            >
                <Typography variant='h6'>
                    <FormattedMessage id='Customer' />
                </Typography>
            </Box>
            {
                props.customer.customer_id ?
                <ReserveCustomerData customer={props.customer}/> :
                <Typography variant='h6'>
                    <FormattedMessage id='Please inform a customer'/>
                </Typography>
            }
        </Paper>
    );
};
 
export default ReserveCustomerShow;