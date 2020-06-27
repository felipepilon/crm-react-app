import React, { useContext, useState } from 'react';
import { Typography, makeStyles, TextField, Button } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import isEmail from 'validator/lib/isEmail';
import { AuthContext } from '../../contexts/Auth';
import { user as userApi } from '../../services/Auth';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    header: {
        marginTop: theme.spacing(2)
    },
    button: {
        margin: theme.spacing(2, 1, 2),
    },
}));

const Email = props => {
    const { user, setUser } = useContext(AuthContext);

    const [ canProceed, setCanProceed ] = useState(user.email && isEmail(user.email));
    const [ errorMsg, setErrorMsg ] = useState('');
    const [ email, setEmail ] = useState(user.email || '')

    const hist = useHistory();

    const classes = useStyles();

    const handleChange = e =>
    {
        const { value } = e.target;

        if (!value || !isEmail(value))
            setCanProceed(false);
        else
            setCanProceed(true);

        setEmail(value);
    }

    const handleProceed = () =>
    {
        userApi({email})
        .then(res => {
            setUser({ ...user, ...res });
            hist.push('/login/password');
        })
        .catch(err => {
            setErrorMsg(err.message || 'Unknown error');
        });
    }

    const error = errorMsg ? true : false;

    return (
        <React.Fragment>
            <Typography variant="h5" className={classes.header}>
                <FormattedMessage id='Sign-In'/>
            </Typography>
            <Typography variant="body1">
                <FormattedMessage id='to continue with CRM'/>
            </Typography>
            <TextField
                label='Email'
                autoFocus
                margin="normal"
                required
                fullWidth
                value={email}
                autoComplete="email"
                onChange={handleChange}
                error={error}
                helperText={error && errorMsg}
            />
            <br/>
            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={!canProceed}
                onClick={handleProceed}
            >
                <FormattedMessage id='Next'/>
            </Button>
        </React.Fragment>
    );
}
 
export default Email;