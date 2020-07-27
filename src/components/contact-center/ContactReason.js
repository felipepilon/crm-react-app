import React, { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useIntl } from 'react-intl';
import { TextField, Box } from '@material-ui/core';

const ContactReason = (props) => {
    const [ options ] = useState([
        { reason: 'Birthday' },
        { reason: 'Reserve' },
        { reason: 'Another' },
    ]);
    const [ open, setOpen ] = useState(false);
    const [ openAnotherReason, setOpenAnotherReason ] = useState(false);

    const intl = useIntl();

    useEffect(() => {
        if (props.reasons.length && props.reasons.find((r) => r.reason === 'Another')) {
            setOpenAnotherReason(true);
        } else {
            setOpenAnotherReason(false);
            props.handleAnotherReasonChange(null);
        }
    // eslint-disable-next-line
    }, [props.reasons]);

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
                value={props.reasons}
                onOpen={() => {setOpen(true)}}
                onClose={() => {setOpen(false)}}
                getOptionLabel={(opt) => intl.formatMessage({ id: opt.reason })}
                renderOption={(opt) => intl.formatMessage({ id: opt.reason })}
                noOptionsText={false}
                onChange={(e, sel) => props.handleReasonsChange(sel)}
                disabled={props.disabled}

                renderInput={(params) => 
                    <TextField
                        { ...params } 
                        label={intl.formatMessage({ id: 'Reason(s)' })}
                        error={props.reasonError ? true : false}
                        helperText={
                            props.reasonError ? intl.formatMessage({id: props.reasonError }) :
                            !props.reasons.length ? intl.formatMessage({id: 'Select reason(s) for contact'}) :
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