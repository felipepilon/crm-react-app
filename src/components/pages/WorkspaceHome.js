import React, { useContext, useEffect } from 'react';
import { Box, Button, Container, useTheme } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';
import { WorkspaceStateContext } from '../../contexts/WorkspaceState';
import SalesPanel from '../sales-view/SalesPanel';
import Agenda from '../agenda-view/Agenda';

const WorkspaceHome = () => {
    const { setStatus } = useContext(WorkspaceStateContext);

    const hist = useHistory();
    const location = useLocation();
    const theme = useTheme();

    const handleAddRerveClick = (e) => {
        e.preventDefault();
        setStatus('loading');
        hist.push(`/workspace/reserve/add`, { from: location });
    }
    
    useEffect(() => {
        setStatus('loaded');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container style={{display: 'flex', paddingTop: theme.spacing(2)}}>
            <Agenda/>
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
        </Container>
    );
}
 
export default WorkspaceHome;