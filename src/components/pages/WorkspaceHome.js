import React, { useContext, useEffect } from 'react';
import { Box, Button, Container } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';
import { WorkspaceStateContext } from '../../contexts/WorkspaceState';
import CustomerSearchIndex from '../fields/CustomerSearchIndex';
import SalesPanel from '../sales-view/SalesPanel';

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
        <Container>
            <Box display='flex' flexDirection='row' paddingTop={2}
            >
                <SalesPanel/>
                <Box
                    width='20%'
                    padding={1}
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
        </Container>
    );
}
 
export default WorkspaceHome;