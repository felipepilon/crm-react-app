import React, { useState, Fragment, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useIntl } from 'react-intl';
import { Typography, TextField, useTheme, Box } from '@material-ui/core';

const ContactReason = (props) => {
    const [ options, setOptions ] = useState([
        { value: 'birthday', label: 'Birthday' },
        { value: 'reserve', label: 'Reserve' },
    ]);
    const [ open, setOpen ] = useState(false);

    const intl = useIntl();
    const theme = useTheme();

    const handleChange = (e, newSelected) => {
        props.setReasons(newSelected);
    }

    return (
        <Box
        >
            <Autocomplete
                multiple
                filterSelectedOptions
                style={{ margin: theme.spacing(1) }}
                options={options}
                open={open}
                onOpen={() => {setOpen(true)}}
                onClose={() => {setOpen(false)}}
                getOptionLabel={(opt) => intl.formatMessage({ id: opt.label })}
                renderOption={(opt) => intl.formatMessage({ id: opt.label })}
                noOptionsText={false}
                onChange={handleChange}
                
                renderInput={(params) => 
                    <TextField
                        { ...params } 
                        size='small'
                        label={intl.formatMessage({ id: 'Reason(s)' })}
                        variant='outlined'
                    />
                }
            />
        </Box>
    );
}
 
export default ContactReason;