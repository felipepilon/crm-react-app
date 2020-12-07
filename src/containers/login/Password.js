import React, { useContext, useState } from 'react';
import { Typography, TextField, Button, Box, useTheme } from '@material-ui/core';
import { FormattedMessage, useIntl } from 'react-intl';
import { AuthContext } from '../../contexts/Auth';
import { post_SignIn } from '../../services/Auth';
import { useHistory } from 'react-router-dom';

const Password = () => {
    const { user, authenticate } = useContext(AuthContext);
    const remember_me = user.remember_me || false;

    const hist = useHistory();
    const intl = useIntl();
    const theme = useTheme();

    const [ password, setPassword ] = useState('')
    const [ canProceed, setCanProceed ] = useState(false);
    const [ errorMsg, setErrorMsg ] = useState('');

    const handleChange = e => { 
        const { value } = e.target;
        setCanProceed(value ? true : false);
        setPassword(value);
    }

    const handleProceed = (e) =>
    {
        e.preventDefault();

        post_SignIn({
            ...{password, remember_me},
            ...user,
        })
        .then(res => {
            authenticate(res)
            hist.push('/workspace');
        })
        .catch(err => {
            setErrorMsg(err.password || err.message || 'Unknown error');
        });
    }
    
    const handleBack = (e) => { 
        e.preventDefault();
        hist.goBack();
    }

    const error = errorMsg ? true : false;

    return (
        <form style={{width: '100%'}}>
            <Typography variant="h5" style={{marginTop: theme.spacing(2)}}>
                <FormattedMessage id='Hi {first_name}' values={user}/>
            </Typography>
            <TextField type="password" margin="normal" required fullWidth autoFocus autoComplete="password"
                label={intl.formatMessage({id: 'Enter your password'})}
                value={password.value}
                onChange={handleChange}
                error={error}
                helperText={error && errorMsg}
            />
            <Box width='100%' display='flex' >
                <Button variant="contained" color="secondary"
                    style={{margin: theme.spacing(2, 1, 2)}}
                    onClick={handleBack}
                >
                    <FormattedMessage id='Back'/>
                </Button>
                <Button  fullWidth variant="contained" color="primary" type='submit'
                    style={{margin: theme.spacing(2, 1, 2)}}
                    disabled={!canProceed}
                    onClick={handleProceed}
                >
                    <FormattedMessage id='Next'/>
                </Button>
            </Box>
        </form>
    );
}
 
export default Password;