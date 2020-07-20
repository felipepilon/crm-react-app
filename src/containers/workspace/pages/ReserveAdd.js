import React, { useEffect, useContext, useState } from 'react';
import { WorkspaceStateContext } from '../../../contexts/WorkspaceState';
import { Box, Grid, Stepper, Step, StepButton } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import ReserveCustomer from '../../../components/reserve/ReserveCustomer';
import ReserveProduct from '../../../components/reserve/ReserveProduct';
import ReserveCheckout from '../../../components/reserve/ReserveCheckout';
import { add as addReserveApi } from '../../../services/Reserve';
import { useLocation, useHistory } from 'react-router-dom';
import { AppStateContext } from '../../../contexts/AppState';
import addDays from 'date-fns/addDays';

const steps = ['customer', 'product', 'checkout']

const ReserveAdd = (props) => {
    const { setStatus } = useContext(WorkspaceStateContext);
    const { setSucessSnack } = useContext(AppStateContext);

    const [ customer, setCustomer ] = useState({});
    const [ products, setProducts ] = useState([]);
    const [ activeStep, setActiveStep ] = useState(0);
    const [ completed, setCompleted ] = useState({});
    const [ store, setStore ] = useState({});
    const [ salesman, setSalesman ] = useState({});
    const [ reminderDate, setReminderDate ] = useState(addDays(new Date(), 7));
    const [ errors, setErrors ] = useState({});

    const loc = useLocation();
    const hist = useHistory();

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

    useEffect(() => {
        setCompleted({
            ...completed,
            ...{2: salesman.salesman_id && store.store_id ? true : false},
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [salesman, store]);

    const handleAddProduct = (newProduct) => {
        setProducts([
            ...products,
            newProduct,
        ])
    };

    const handleRemoveProduct = (prodIndex) => {
        setProducts(products.filter((p, i) => i !== prodIndex));
    }

    const handleConfirmReserve = () => {
        const reserveData = {
            store_group_id: store.store_group_id,
            store_id: store.store_id,
            customer_id: customer.customer_id,
            salesman_id: salesman.salesman_id,
            reserve_date: new Date(),
            products: products.map((prod) => { 
                return {
                    product_id: prod.product.product_id,
                    product_color_id: prod.color.product_color_id,
                    size: prod.size,
                    quantity: prod.quantity,
                }
            }),
            reminders: [
                { reminder_date: reminderDate },
            ]
        };

        addReserveApi(reserveData)
        .then((res) => {
            setSucessSnack('Reserve added successfully')
            
            if (loc.state.from || loc.state.from.pathname)
                hist.push(loc.state.from.pathname);
        })
        .catch((err) => {
            console.log('err =>', err)
            setErrors(err);
        })
    }

    const disableCheckout = !completed[0] || !completed[1] ? true : false
    const disableSubmit = !completed[0] || !completed[1] || !completed[2] ? true : false
    
    return (
        <Box
            display='flex'
            justifyContent='center'
        >
            <Box
                display='flex'
                flexDirection='column'
                maxWidth='800px'
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
                    <Step disabled={disableCheckout}>
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
                        handleNextStep={handleNextStep}
                    />
                    <ReserveCheckout
                        step={2}
                        activeStep={activeStep}
                        store={store}
                        setStore={setStore}
                        salesman={salesman}
                        setSalesman={setSalesman}
                        reminderDate={reminderDate}
                        setReminderDate={setReminderDate}
                        disableSubmit={disableSubmit}
                        handleConfirmReserve={handleConfirmReserve}
                    />
                </Grid>
            </Box>
        </Box>
    );
}
 
export default ReserveAdd;