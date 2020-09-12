import React from 'react';
import { AppBar, Toolbar, useTheme } from '@material-ui/core';
import LoginMenu from './LoginMenu';
import MenuButton from './menu/MenuButton';
import CustomerSearch from './CustomerSearch';

const WorkBar = () => {
    const theme = useTheme();

    return ( 
        <AppBar position='static'>
            <Toolbar>
                <MenuButton/>
                <img src={require('./home-bar.png')} height='45px' style={{marginLeft: theme.spacing(1), marginRight: theme.spacing(3)}} alt=''/>
                <CustomerSearch/>
                <LoginMenu/>
            </Toolbar>
        </AppBar>
     );
}
 
export default WorkBar;