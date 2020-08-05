import React, { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useIntl } from 'react-intl';
import { TextField, Box } from '@material-ui/core';

const ContactReason = (props) => {
    const [ options ] = useState([
        'Birthday',
        'Reserve',
        'Another',
    ]);
    const [ open, setOpen ] = useState(false);
    const [ openAnotherReason, setOpenAnotherReason ] = useState(false);

    const handleChange = (e, sel) => {
        props.handleReasonsChange(sel && sel.length ? sel.join(', ') : null);
    }

    const intl = useIntl();

    useEffect(() => {
        if (props.reasons && props.reasons.includes('Another')) {
            setOpenAnotherReason(true);
        } else {
            setOpenAnotherReason(false);
            props.handleAnotherReasonChange(null);
        }
    // eslint-disable-next-line
    }, [props.reasons]);

    const value = props.reasons ?
        props.reasons.split(', ') :
        [];

    return (
        <Box
            display='flex'
            flexDirection='column'
            width='100%'
            marginTop={1}
        >
            <Autocomplete
                multiple
                filterSelectedOptions
                options={options}
                open={open}
                value={value}
                onOpen={() => {setOpen(true)}}
                onClose={() => {setOpen(false)}}
                getOptionLabel={(opt) => intl.formatMessage({ id: opt })}
                renderOption={(opt) => intl.formatMessage({ id: opt })}
                noOptionsText={false}
                onChange={handleChange}
                disabled={props.disabled}

                renderInput={(params) => 
                    <TextField
                        { ...params } 
                        label={intl.formatMessage({ id: 'Reason(s)' })}
                        error={props.reasonError ? true : false}
                        helperText={
                            props.reasonError ? intl.formatMessage({id: props.reasonError }) :
                            !value.length ? intl.formatMessage({id: 'Select reason(s) for contact'}) :
                            null
                        }
                    />
                }
            />
            {
                openAnotherReason ?
                <TextField
                    size='small'
                    value={props.another_reason || ''}
                    onChange={(e) => props.handleAnotherReasonChange(e.target.value || null)}
                    label={intl.formatMessage({ id: 'Another Reason' })}
                    disabled={props.disabled}
                    error={props.anotherReasonError ? true : false}
                    helperText={
                        props.anotherReasonError ?
                        intl.formatMessage({id: props.anotherReasonError}) :
                        null
                    }
                /> : 
                null
            }
        </Box>
    );
}
 
export default ContactReason;