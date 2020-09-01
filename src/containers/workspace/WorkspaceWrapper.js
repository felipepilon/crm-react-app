import React, { useEffect, useContext } from 'react';
import { Box } from '@material-ui/core';
import { AppStateContext } from '../../contexts/AppState';
import WorkBar from './WorkBar';
import MenuDrawer from './menu/MenuDrawer'
import PageWrapper from '../../components/PageWrapper';
import SuccessSnack from '../../components/SuccessSnack';
import WorkspaceStateContextProvider from '../../contexts/WorkspaceState';
import WorkspacePageLoader from '../../components/WorkspacePageLoader';

const Workspace = () => {
    const { setStatus } = useContext(AppStateContext)

    useEffect(() => {
        setTimeout(() => {
            setStatus('loaded')
        }, 2000)
    });

    return (
        <WorkspaceStateContextProvider>
            <Box
                display='flex'
                flexDirection='column'
                minHeight='0'
                height='100%'
            >
                <WorkBar/>
                <MenuDrawer/>
                <PageWrapper/>
                <Box height='30px'>Footer</Box>
                <SuccessSnack/>
                <WorkspacePageLoader/>
            </Box>
        </WorkspaceStateContextProvider>
    );
}
 
export default Workspace;