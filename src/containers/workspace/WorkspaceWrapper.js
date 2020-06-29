import React, { useEffect, useContext } from 'react';
import { Box } from '@material-ui/core';
import { AppStateContext } from '../../contexts/AppState';
import WorkBar from './WorkBar';
import MenuDrawer from './menu/MenuDrawer'
import PageWrapper from './PageWrapper';
import SuccessSnack from '../../components/SuccessSnack';

const Workspace = () => {
    const { setStatus } = useContext(AppStateContext)

    useEffect(() => {
        setTimeout(() => {
            setStatus('loaded')
        }, 2000)
    });

    return (
        <Box
            display='flex'
            flexDirection='column'
            height='100%'
        >
            <WorkBar/>
            <MenuDrawer/>
            <PageWrapper/>
            <Box height='30px' bgcolor='red' >Footer</Box>
            <SuccessSnack/>
        </Box>
    );
}
 
export default Workspace;