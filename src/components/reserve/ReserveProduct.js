import React from 'react';
import ReserveProductSearch from './ReserveProductSearch';
import ReserveProductShow from './ReserveProductShow';
import { Grid } from '@material-ui/core';

const ReserverProduct = (props) => {
    const isActive = props.step === props.activeStep;

    const xs = isActive ? 6 : 3;

    return (
        <Grid item xs={xs}>
            {
                isActive ? 
                <ReserveProductSearch
                    products={props.products}
                    handleAddProduct={props.handleAddProduct}
                    handleRemoveProduct={props.handleRemoveProduct}
                /> : 
                <ReserveProductShow
                    products={props.products}
                />
            }
        </Grid>
    );
};
 
export default ReserverProduct;