import React from 'react';
import ReserveProductSearch from './ReserveProductSearch';
import ReserveProductShow from './ReserveProductShow';
import { Paper, useTheme } from '@material-ui/core';

const ReserverProduct = (props) => {
    const theme = useTheme();

    const isActive = props.step === props.activeStep;
    const width = isActive ? '50%' : '25%';

    return (
        <Paper style={{ margin: theme.spacing(1), padding: theme.spacing(1), width }}>
            {
                isActive ? 
                <ReserveProductSearch
                    products={props.products}
                    handleAddProduct={props.handleAddProduct}
                    handleRemoveProduct={props.handleRemoveProduct}
                    handleNextStep={props.handleNextStep}
                /> : 
                <ReserveProductShow
                    products={props.products}
                />
            }
        </Paper>
    );
};
 
export default ReserverProduct;