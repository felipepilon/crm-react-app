import React, { useEffect, useContext, useState } from 'react';
import { WorkspaceStateContext } from '../../../contexts/WorkspaceState';
import { customer as getCustomerApi } from '../../../services/Customer'
import { Box, Typography, Container } from '@material-ui/core';
import CustomerDataPaper from '../../../components/customer-view/CustomerDataPaper';
import ReservesTable from '../../../components/customer-view/ReservesTable';
import ContactCenter from '../../../components/contact-center/ContactCenter';

const CustomerView = (props) => {
    const { setStatus } = useContext(WorkspaceStateContext);
    const [ customer, setCustomer ] = useState({});
    
    useEffect(() => {
        getCustomerApi(props.customerId)
        .then((res) => {
            setStatus('loaded');
            setCustomer(res);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <Box
                display='flex'
                justifyContent='center'
                padding={1}
            >
                <Typography variant='h5'>
                    { customer.name }
                </Typography>
            </Box>
            <Box display='flex'>
                <Box width='30%' padding={1}>
                    <CustomerDataPaper
                        customer={customer}
                    />
                </Box>
                <Box
                    flex='1'
                    padding={1}
                >
                    <ContactCenter
                        customer={customer}
                    />
                </Box>
            </Box>
            <Box
                display='flex'
                padding={1}
            >
                <ReservesTable
                    customer_id={customer.customer_id}
                />
            </Box>
        </Container>
    );
}
 
export default CustomerView;