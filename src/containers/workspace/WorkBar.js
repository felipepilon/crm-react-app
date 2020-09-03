import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, useTheme } from '@material-ui/core';
import LoginMenu from './LoginMenu';
import { FormattedMessage } from 'react-intl';
import MenuButton from './menu/MenuButton';
import { useHistory, useLocation } from 'react-router-dom';
import { WorkspaceStateContext } from '../../contexts/WorkspaceState';
import CustomerSearchIndex from '../../components/fields/CustomerSearchIndex';
import CustomerSearch from './CustomerSearch';

const WorkBar = () => {
    const theme = useTheme();

    return ( 
        <AppBar position='static'>
            <Toolbar>
                <MenuButton/>
                <img src={require('./home-bar.png')} height='45px' style={{marginLeft: theme.spacing(1), marginRight: theme.spacing(3)}}/>
                <CustomerSearch/>
                <LoginMenu/>
            </Toolbar>
        </AppBar>
     );
}
 
export default WorkBar;