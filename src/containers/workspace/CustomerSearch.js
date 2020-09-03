import React, { useContext } from 'react';
import { useTheme, fade, Box } from '@material-ui/core';
import CustomerSearchIndex from '../../components/fields/CustomerSearchIndex';
import { useHistory, useLocation } from 'react-router-dom';

const CustomerSearch = () => {
    const hist = useHistory();
    const loc = useLocation();
    const theme = useTheme();

    const handleCustomerSelect = (customer) => {
        console.log('handleCustomerSelect', customer)
        hist.push(`/workspace/customers/view/${customer.customer_id}`, { from: loc });
        
    }

    return (
        <Box
            bgcolor={fade(theme.palette.common.white, 0.25)}
            borderRadius={theme.shape.borderRadius}
            width='20em'
        >
            <CustomerSearchIndex handleCustomerSelect={handleCustomerSelect}/>
        </Box>
    );
}
 
export default CustomerSearch;