import React, { useContext } from 'react';
import { AppStateContext } from '../../../contexts/AppState';
import { Drawer, makeStyles, List, ListItem, ListItemText, ListItemIcon, Divider } from '@material-ui/core';
import { useIntl } from 'react-intl';
import StoreIcon from '@material-ui/icons/Store';
import BusinessIcon from '@material-ui/icons/Business';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import { useHistory } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { Can } from '../../../contexts/Can';

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
                        <ListItem button onClick={(e) => handleMenuClick(e, '/workspace/stores/list')}>
                            <ListItemIcon><StoreIcon/></ListItemIcon>
                            <ListItemText primary={intl.formatMessage({id: 'Stores'})}/>
                        </ListItem>
                    </Can>
                    <Can I='read' a='Franchises'>
                        <ListItem button onClick={(e) => handleMenuClick(e, '/workspace/franchises/list')}>
                            <ListItemIcon><BusinessIcon/></ListItemIcon>
                            <ListItemText primary={intl.formatMessage({id: 'Franchises'})}/>
                        </ListItem>
                    </Can>
                    <Can I='read' a='Customers'>
                        <ListItem button onClick={(e) => handleMenuClick(e, '/workspace/customers/list')}>
                            <ListItemIcon><EmojiPeopleIcon/></ListItemIcon>
                            <ListItemText primary={intl.formatMessage({id: 'Customers'})}/>
                        </ListItem>
                    </Can>
                </List>
                <Divider/>
                <List>
                    <Can I='read' a='Store Groups'>
                        <ListItem button onClick={(e) => handleMenuClick(e, '/workspace/storeGroups/list')}>
                            <ListItemText primary={intl.formatMessage({id: 'Store Groups'})}/>
                        </ListItem>
                    </Can>
                    <Can I='read' a='Users'>
                        <ListItem button onClick={(e) => handleMenuClick(e, '/workspace/users')}>
                            <ListItemText primary={intl.formatMessage({id: 'Users'})}/>
                        </ListItem>
                    </Can>
                </List>
            </div>
        </Drawer>
    );
};

export default MenuButton;