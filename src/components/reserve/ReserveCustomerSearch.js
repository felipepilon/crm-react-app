import React from 'react';
import { Box, Paper, makeStyles, Typography, Grid, Button } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import CustomerSearchCPF from '../fields/CustomerSearchCPF';
import ReserveCustomerData from './ReserveCustomerData';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    },
    button: {
        marginLeft: theme.spacing(2)
    },
}));

const ReserveCustomerSearch = (props) => {
    const classes = useStyles();

    const handleCustomerSelect = (selectedCustomer) => {
        props.setCustomer(selectedCustomer);
    }

    const handleProceedClick = () => {
        props.handleNextStep();
    }

    const handleCleanClick = () => {
        props.setCustomer({});
    }

    return (
        <Paper className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box
                        display='flex'
                        justifyContent='center'
                    >
                        <Typography variant='subtitle1'>
                            <FormattedMessage id='Customer Search' />
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <CustomerSearchCPF
                        handleCustomerSelect={handleCustomerSelect}
                    />
                </Grid>
                <Grid item xs={12}>
                    {
                        props.customer.customer_id ?
                        <ReserveCustomerData
                            customer={props.customer}
                        /> :
                        <Typography variant='body1'>
                            <FormattedMessage id="Use above filter to search for a customer"/>
                        </Typography>
                    }
                </Grid>
                <Grid item xs={12}>
                    <Box
                        display='flex'
                        justifyContent='flex-end'
                    >
                        <Button
                            variant='contained'
                            disabled={props.customer.customer_id ? false : true}
                            onClick={handleCleanClick}
                        >
                            <FormattedMessage id='Clean' />
                        </Button>
                        <Button
                            variant='contained'
                            disabled={props.customer.customer_id ? false : true}
                            color='primary'
                            onClick={handleProceedClick}
                            className={classes.button}
                        >
                            <FormattedMessage id='Continue' />
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default ReserveCustomerSearch;