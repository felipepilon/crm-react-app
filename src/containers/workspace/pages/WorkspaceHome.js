import React, { useContext, useEffect } from 'react';
import { Box, Grid, Button } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';
import { WorkspaceStateContext } from '../../../contexts/WorkspaceState';

const WorkspaceHome = () => {
    const { setStatus } = useContext(WorkspaceStateContext);

    const hist = useHistory();
    const location = useLocation();

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
        <Box
            display='flex'
            justifyContent='center'
            padding={3}
        >
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Box
                        width='100%'
                        height='200px'
                        bgcolor='yellow'
                    >
                        Buscar Cliente
                    </Box>
                </Grid>
                <Grid item xs={7}>
                    <Box
                        width='100%'
                        height='500px'
                        bgcolor='yellow'
                    >
                        Box 2
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={handleAddRerveClick}
                    >
                        <FormattedMessage id='New Reserve' />
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
 
export default WorkspaceHome;