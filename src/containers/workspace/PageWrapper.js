import React, { useEffect, useContext } from 'react';
import { Box } from '@material-ui/core';
import { AppStateContext } from '../../contexts/AppState';
import WorkspaceRouter from './WorkspaceRouter'

const PageWrapper = () => {
    const { setStatus } = useContext(AppStateContext)

    useEffect(() => {
        setTimeout(() => {
            setStatus('loaded')
        }, 2000)
    })

    return (
        <Box
            flex='1'
            minHeight='0'
            height='100%'
            overflow='auto'
        >
            <WorkspaceRouter/>
        </Box>
    );
}
 
export default PageWrapper;