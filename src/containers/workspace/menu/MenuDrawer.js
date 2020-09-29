import React, { useContext } from 'react';
import { AppStateContext } from '../../../contexts/AppState';
import { Drawer, makeStyles, List, ListItem, ListItemText, ListItemIcon, Divider, Link } from '@material-ui/core';
import { useIntl } from 'react-intl';
import StoreIcon from '@material-ui/icons/Store';
import BusinessIcon from '@material-ui/icons/Business';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import { useHistory } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { Can } from '../../../contexts/Can';
import { Link as LinkRouter } from 'react-router-dom';
import MenuItem from './MenuItem';

const useStyles = makeStyles({
    root: {
      width: 250,
    },
});

const MenuButton = () => {
    const { isMenuOpen, setMenuOpen } = useContext(AppStateContext);

    const classes = useStyles();

    const intl = useIntl();

    const hist = useHistory();

    const closeDrawer = () => {
        setMenuOpen(false);
    };

    const handleMenuClick = (e, path) => {
        e.preventDefault();
        hist.push(path);
    };

    return (
        <Drawer open={isMenuOpen} onClose={closeDrawer}>
            <div
                className={classes.root}
                onClick={closeDrawer}
                onKeyDown={closeDrawer}
            >
                <List>
                    <ListItem button onClick={(e) => handleMenuClick(e, '/workspace')}>
                        <ListItemIcon><HomeIcon/></ListItemIcon>
                        <ListItemText primary={intl.formatMessage({id: 'Workspace'})}/>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <Can I='read' a='Stores'>
                        <MenuItem title='Stores' to='/workspace/stores' iconComp={<StoreIcon/>}/>
                    </Can>
                    <Can I='read' a='Franchises'>
                        <MenuItem title='Franchises' to='/workspace/franchises' iconComp={<BusinessIcon/>}/>
                    </Can>
                    <Can I='read' a='Customers'>
                        <MenuItem title='Customers' to='/workspace/customers' iconComp={<EmojiPeopleIcon/>}/>
                    </Can>
                </List>
                <Divider/>
                <List>
                    <Can I='read' a='Store Groups'>
                        <MenuItem title='Store Groups' to='/workspace/storeGroups'/>
                    </Can>
                    <Can I='read' a='Users'>
                        <MenuItem title='Users' to='/workspace/users'/>
                    </Can>
                </List>
            </div>
        </Drawer>
    );
};

export default MenuButton;