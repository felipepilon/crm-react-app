import React, { useEffect, useContext, useState } from 'react';
import { WorkspaceStateContext } from '../../../contexts/WorkspaceState';
import { Box, Grid, Stepper, Step, StepButton } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import ReserveCustomer from '../../../components/reserve/ReserveCustomer';
import ReserveProduct from '../../../components/reserve/ReserveProduct';
import ReserveCheckout from '../../../components/reserve/ReserveCheckout';

const steps = ['customer', 'product', 'checkout']

const ReserveAdd = (props) => {
    const { setStatus } = useContext(WorkspaceStateContext);

    const [ customer, setCustomer ] = useState({});
    const [ products, setProducts ] = useState([]);
    const [ activeStep, setActiveStep ] = useState(0);
    const [ completed, setCompleted ] = React.useState({});

    useEffect(() => {
        setStatus('loaded');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleStep = (step) => () => {
        setActiveStep(step);
    }

    const handleNextStep = () => {
        if (activeStep < steps.length)
            setActiveStep(activeStep + 1);
    }

    useEffect(() => {
        setCompleted({
            ...completed,
            ...{0: customer.customer_id ? true : false},
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customer]);

    useEffect(() => {
        setCompleted({
            ...completed,
            ...{1: products.length ? true : false},
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products]);

    const handleAddProduct = (newProduct) => {
        setProducts([
            ...products,
            newProduct,
        ])
    };

    const handleRemoveProduct = (prodIndex) => {
        const newProds = [ ...products ];
        newProds.splice(prodIndex);
    }

    return (
        <Box
            display='flex'
            justifyContent='center'
            padding={5}
            flexDirection='column'
        >
            <Stepper nonLinear activeStep={activeStep}>
                <Step>
                    <StepButton onClick={handleStep(0)} completed={completed[0]}>
                        <FormattedMessage id='Customer'/>
                    </StepButton>
                </Step>
                <Step>
                    <StepButton onClick={handleStep(1)} completed={completed[1]}>
                        <FormattedMessage id='Products'/>
                    </StepButton>
                </Step>
                <Step disabled={!completed[0] || !completed[1]}>
                    <StepButton onClick={handleStep(1)} completed={completed[2]}>
                        <FormattedMessage id='Checkout'/>
                    </StepButton>
                </Step>
            </Stepper>
            <Grid container spacing={2}>
                <ReserveCustomer
                    step={0}
                    activeStep={activeStep}
                    customer={customer}
                    setCustomer={setCustomer}
                    handleNextStep={handleNextStep}
                />
                <ReserveProduct
                    step={1}
                    activeStep={activeStep}
                    products={products}
                    handleAddProduct={handleAddProduct}
                    handleRemoveProduct={handleRemoveProduct}
                />
                <ReserveCheckout
                    step={2}
                    activeStep={activeStep}
                />
            </Grid>
        </Box>
    );
}
 
export default ReserveAdd;