import React, { useContext, useState } from 'react';
import { Typography, makeStyles, TextField, Button, FormControlLabel, Checkbox, Box } from '@material-ui/core';
import { FormattedMessage, useIntl } from 'react-intl';
import { AuthContext } from '../../contexts/Auth';
import { post_SignIn } from '../../services/Auth';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    header: {
        marginTop: theme.spacing(2)
    },
    button: {
        margin: theme.spacing(2, 1, 2),
    },
}));

const Password = (props) => {
    const { user, setUser, authenticate } = useContext(AuthContext);
    const remember_me = user.remember_me || false;

    const [ password, setPassword ] = useState('')
    const [ canProceed, setCanProceed ] = useState(false);
    const [ errorMsg, setErrorMsg ] = useState('');

    const hist = useHistory();

    const classes = useStyles();

    const intl = useIntl();

    const handleChange = e => { 
        const { value } = e.target;
        setCanProceed(value ? true : false);
        setPassword(value);
    }

    const handleProceed = () =>
    {
        post_SignIn({
            ...{password, remember_me},
            ...user,
        })
        .then(res => {
            authenticate(res)
            hist.push('/workspace');
        })
        .catch(err => {
            setErrorMsg(err.message || 'Unknown error');
        });
    }

    const handleRememberMe = () => { setUser({ ...user, ...{ remember_me: !remember_me }}); };

    const handleBack = () => { hist.goBack() };

    const error = errorMsg ? true : false;

    return (
        <React.Fragment>
            <Typography variant="h5" className={classes.header}>
                <FormattedMessage id='Hi {first_name}' values={user}/>
            </Typography>
            <Typography variant="body1">
                {user.email}
            </Typography>
            <TextField
                label={intl.formatMessage({id: 'Enter your password'})}
                type="password"
                margin="normal"
                required
                fullWidth
                autoFocus
                autoComplete="password"
                value={password.value}
                onChange={handleChange}
                error={error}
                helperText={error && errorMsg}
            />
            <br/>
            <FormControlLabel
                control={<Checkbox
                    checked={remember_me} 
                    onChange={handleRememberMe}
                    color="primary"
                />}
                label={intl.formatMessage({id: 'Keep me in'})}
            /> 
            <Box
                width='100%'
                display='flex'
            >
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={handleBack}
                >
                    <FormattedMessage id='Back'/>
                </Button>
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
            </Box>
        </React.Fragment>
    );
}
 
export default Password;