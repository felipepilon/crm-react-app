import React, { useContext, useEffect } from 'react';
import { Box, Button } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';
import { WorkspaceStateContext } from '../../../contexts/WorkspaceState';
import CustomerSearchIndex from '../../../components/fields/CustomerSearchIndex';

const WorkspaceHome = () => {
    const { setStatus } = useContext(WorkspaceStateContext);

    const hist = useHistory();
    const location = useLocation();

    const handleAddRerveClick = (e) => {
        e.preventDefault();
        setStatus('loading');
        hist.push(`/workspace/reserve/add`, { from: location });
    }

    const handleCustomerSelect = (customer) => {
        setStatus('loading');
        hist.push(`/workspace/customers/view/${customer.customer_id}`, { from: location });
    }

    useEffect(() => {
        setStatus('loaded');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box
            display='flex'
            justifyContent='center'
            padding={3}
        >
            <Box
                display='flex'
                minWidth='800px'
            >
                <Box
                    width='20%'
                    padding={2}
                >
                    <CustomerSearchIndex
                        handleCustomerSelect={handleCustomerSelect}
                    />
                </Box>
                <Box
                    flex='1'
                    bgcolor='yellow'
                    height='500px'
                    padding={2}
                >
                    Parte 2
                </Box>
                <Box
                    width='20%'
                    padding={2}
                >
                    <Button
                        fullWidth
                        variant='contained'
                        color='primary'
                        onClick={handleAddRerveClick}
                    >
                        <FormattedMessage id='New Reserve' />
                    </Button>
                </Box>
            </Box>
            
        </Box>
    );
}
 
export default WorkspaceHome;