import React from 'react';
import { useIntl } from 'react-intl';
import { Checkbox, FormControlLabel } from '@material-ui/core';

const EnhancedFieldCheckbox = (props) => {
    const intl = useIntl();

    const checked = typeof props.data[props.field.name] !== 'undefined' && props.data[props.field.name] ? true : false;
    const error = props.errors[props.field.name] || '';

    const handleChange = (newValue) => {
        if (props.handleFieldChange)
            props.handleFieldChange(props.field.name, newValue)
    }

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    onChange={(e) => handleChange(e.target.checked)}
                    color="primary"
                />
            }
        />
    );
}
 
export default EnhancedFieldCheckbox;