import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

const PageFieldCheckbox = ({value, fieldKey, error, handleChange}) => {
    const checked = typeof value !== 'undefined' && value ? true : false;

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    onChange={(e) => handleChange(fieldKey, e.target.checked)}
                    color="primary"
                />
            }
        />
    );
}
 
export default PageFieldCheckbox;