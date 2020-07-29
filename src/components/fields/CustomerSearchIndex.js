import React, { useState, useEffect, Fragment } from 'react';
import { TextField, CircularProgress, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { customersIndex as getCustomersIndexApi } from '../../services/Customer';
import LabelMask from '../../utils/LabelMasks';
import { useIntl } from 'react-intl';

const minLength = 2;

const CustomerSearchIndex = (props) => {
    const [ inputValue, setInputValue ] = useState('');
    const [ open, setOpen ] = useState(false);
    const [ options, setOptions ] = useState([]);

    const intl = useIntl();

    const loading = open && !options.length && inputValue.length >= minLength;

    const handleChange = (e, selOpt) => {
        if (selOpt && selOpt.customer_id)
            props.handleCustomerSelect(selOpt);
    }

    const handleInputChange = (e, newValue) => {
        setInputValue(newValue);
    }

    useEffect(() => {
        if (!loading)
            return;

        getCustomersIndexApi({ search_index: inputValue })
        .then(result => {
            setOptions(result);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    useEffect(() => {
        if (!open || inputValue < minLength)
            setOptions([]);
    }, [open, inputValue])

    return (
        <Autocomplete
            style={{ width: '100%', marginTop: props.marginTop }}
            options={options}
            open={open}
            onOpen={() => {setOpen(true)}}
            onClose={() => {setOpen(false)}}
            getOptionLabel={(opt) => opt.search_index}
            renderOption={(opt) => {
                return (
                    <Fragment>
                        <Typography variant='body1'>
                            {LabelMask.cpf(opt.cpf)} - {opt.name}
                        </Typography>
                        <Typography variant='body2'>
                            {opt.addr1} {opt.addr2} {opt.addr3} {opt.city} {opt.state}
                        </Typography>
                    </Fragment>
                )
            }}
            noOptionsText={false}
            onChange={handleChange}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            renderInput={(params) => 
                <TextField 
                    { ...params } 
                    label={intl.formatMessage({ id: 'Customer' })}
                    variant='outlined'
                    fullWidth
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <Fragment>
                                {loading ? <CircularProgress size={20}/> : null}
                            </Fragment>
                        ),
                    }}
                />
            }
        />
    )
}
 
export default CustomerSearchIndex;