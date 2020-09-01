import React, { useState, useEffect } from 'react';
import { Select, FormControl, MenuItem, FormHelperText } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

const EnhancedFieldText = (props) => {
    const { field } = props;

    const [options, setOptions] = useState([]);

    const value = props.data[field.name] || '';
    const error = props.errors[field.name] || '';

    const handleChange = (e) => {
        if (props.handleFieldChange)
            props.handleFieldChange(field.name, e.target.value || null);
    }

    useEffect(() => {
        field.findDataFnc(props.findDataParams)
        .then((res) => {
            setTimeout(() => {
                const newOptions = res.map((opt) => {
                    return {
                        value: opt[field.valueColumnName || field.name] || '<missing value>',
                        label: opt[field.labelColumnName || field.name] || '<missing value>',
                    }   
                })
                setOptions(newOptions);
            }, 500)
        })
    }, []);
    
    return (
        <FormControl error={error ? true : false} fullWidth size='small'>
            <Select
                value={value}
                onChange={handleChange}
                variant='outlined'
                displayEmpty
            >
            <MenuItem value=''>
                <em><FormattedMessage id='Select'/></em>
            </MenuItem>
            {
                options.map((opt) => {
                    return (
                        <MenuItem key={opt.value}
                            value={opt.value}
                        >
                            {opt.label}
                        </MenuItem>
                    )
                })
            }
            </Select>
            {
                error ?
                <FormHelperText><FormattedMessage id={error}/></FormHelperText> :
                null
            }
        </FormControl>
    );
}
 
export default EnhancedFieldText;