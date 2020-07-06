import React from 'react';
import ReserveCustomerSearch from './ReserveCustomerSearch';
import ReserveCustomerShow from './ReserveCustomerShow';
import { Grid } from '@material-ui/core';

const ReserveCustomer = (props) => {
    const isActive = props.step === props.activeStep;

    const xs = isActive ? 6 : 3;

    return (
        <Grid item xs={xs}>
            {
                isActive ? 
                <ReserveCustomerSearch
                    customer={props.customer}
                    setCustomer={props.setCustomer}
                    handleNextStep={props.handleNextStep}
                /> : 
                <ReserveCustomerShow
                    customer={props.customer}
                />
            }
        </Grid>
    );
};
 
export default ReserveCustomer;