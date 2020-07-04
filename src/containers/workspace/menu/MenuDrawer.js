import React, { useContext } from 'react';
import { AppStateContext } from '../../../contexts/AppState';
import { Drawer, makeStyles, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { useIntl } from 'react-intl';
import StoreIcon from '@material-ui/icons/Store';
import { useHistory } from 'react-router-dom';

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
                    <ListItem button onClick={(e) => handleMenuClick(e, '/workspace/stores/list')}>
                        <ListItemIcon><StoreIcon/></ListItemIcon>
                        <ListItemText primary={intl.formatMessage({id: 'Stores'})}/>
                    </ListItem>
                    <ListItem button onClick={(e) => handleMenuClick(e, '/workspace/franchises/list')}>
                        <ListItemIcon><StoreIcon/></ListItemIcon>
                        <ListItemText primary={intl.formatMessage({id: 'Franchises'})}/>
                    </ListItem>
                </List>
            </div>
        </Drawer>
    );
};

export default MenuButton;