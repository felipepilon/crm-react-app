import React from 'react';
import { TextField } from '@material-ui/core';
import { useIntl } from 'react-intl';
import FieldInputMask from '../fields/FieldInputMask';

const EnhancedFieldInput = (props) => {
    const intl = useIntl();

    const handleChange = (e) => {
        if (props.handleFieldChange)
            props.handleFieldChange(props.name, e.target.value)
    }

    return (
        <TextField
            fullWidth
            value={props.value}
            onChange={handleChange}
            variant='outlined'
            error={props.error ? true : false}
            helperText={props.error && intl.formatMessage({ id: props.error })}
            InputProps={
                props.mask ? { inputComponent: FieldInputMask[props.mask] } : null
            }
        />
    );
}
 
export default EnhancedFieldInput;