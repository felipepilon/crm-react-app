import React, { useEffect, useContext, useState } from 'react';
import { WorkspaceStateContext } from '../../../contexts/WorkspaceState';
import { customer as getCustomerApi } from '../../../services/Customer'
import { Box, Typography } from '@material-ui/core';
import CustomerDataPaper from '../../../components/customer-view/CustomerDataPaper';
import ReservesTable from '../../../components/customer-view/ReservesTable';

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
        <Box
            display='flex'
            justifyContent='center'
        >
            <Box
                display='flex'
                flexDirection='column'
                width='90vh'
            >
                <Box
                    display='flex'
                    justifyContent='center'
                    padding={2}
                >
                    <Typography variant='h5'>
                        { customer.name }
                    </Typography>
                </Box>
                <Box display='flex'>
                    <Box width='40%'>
                        <CustomerDataPaper
                            customer={customer}
                        />
                    </Box>
                    <Box
                        flex='1'
                        bgcolor='blue'
                    >
                        Realizar atendimento
                    </Box>
                </Box>
                <Box
                    display='flex'
                >
                    <ReservesTable
                        customerId={customer.customer_id}
                    />
                </Box>
            </Box>
        </Box>
    );
}
 
export default CustomerView;