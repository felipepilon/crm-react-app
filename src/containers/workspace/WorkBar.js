import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles, } from '@material-ui/core';
import LoginMenu from './LoginMenu';
import { FormattedMessage } from 'react-intl';
import MenuButton from './menu/MenuButton';

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
    },
    toolbar: {
        '& > *': { margin: theme.spacing(1), },
    },
}));

const WorkBar = () => {
    const classes = useStyles()

    return ( 
        <AppBar position='static'>
            <Toolbar className={classes.toolbar}>
                <MenuButton/>
                <Typography variant='h6' className={classes.title}>
                    <FormattedMessage id='CRM' />
                </Typography>
                <LoginMenu/>
            </Toolbar>
        </AppBar>
     );
}
 
export default WorkBar;