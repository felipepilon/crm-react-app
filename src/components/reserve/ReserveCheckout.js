import React, { Fragment } from 'react';
import { Grid, Paper, makeStyles, Box, Typography, Button } from '@material-ui/core';
import { FormattedMessage, useIntl } from 'react-intl';
import StoreSelect from '../fields/StoreSelect';
import SalesmanSelect from '../fields/SalesmanSelect';
import { KeyboardDatePicker } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
    },
}));

const ReserveCheckout = (props) => {
    const classes = useStyles();

    const intl = useIntl();

    const isActive = props.step === props.activeStep;

    const xs = isActive ? 6 : 3;

    const handleConfirmReserve = (e) => {
        e.preventDefault();
        props.handleConfirmReserve();
    }

    return (
        <Grid item xs={xs}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box display='flex' justifyContent='center'>
                            <Typography variant='subtitle1'>
                                <FormattedMessage id='Confirm'/>
                            </Typography>
                        </Box>
                    </Grid>
                    {
                        isActive ?
                        <Fragment>
                            <Grid item xs={12}>
                                <StoreSelect
                                    store_id={props.store_id}
                                    handleStoreIdChange={props.handleStoreIdChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <SalesmanSelect
                                    salesman_id={props.salesman_id}
                                    handleSalesmanIdChange={props.handleSalesmanIdChange}
                                    store_id={props.store_id}
                                />
                            </Grid> 
                            <Grid item xs={12}>
                                <KeyboardDatePicker
                                    label={intl.formatMessage({ id: 'Remember me at' })}
                                    value={props.reminderDate}
                                    onChange={props.setReminderDate}
                                    format="dd/MM/yyyy"
                                    size='small'
                                    clearable
                                    disablePast
                                />
                            </Grid>
                        </Fragment> :
                        null
                    }
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant='contained'
                            color='primary'
                            disabled={props.disableSubmit}
                            onClick={handleConfirmReserve}
                        >
                            <FormattedMessage id='Confirm reserve'/>
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};
 
export default ReserveCheckout;