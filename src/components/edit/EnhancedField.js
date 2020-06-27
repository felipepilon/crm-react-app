import React from 'react';
import { InputLabel, TextField, Grid, Box } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import TextMaskPhone from '../fields/TextMaskPhone';
import EnhancedFieldLabel from './EnhancedFieldLabel'

const EnhancedField = props => {
    const handleChange = (e) => {
        if (props.handleFieldChange)
            props.handleFieldChange(props.name, e.target.value)
    }

    let fieldComponent;

    switch(props.type)
    {
        case 'label':
            fieldComponent = (
                <EnhancedFieldLabel
                    value={props.value}
                    mask={props.mask}
                />
            );
            break;
        
        default:
            fieldComponent = (
                <TextField
                    fullWidth
                    value={props.value}
                    onChange={handleChange}
                    variant='outlined'
                    error={props.error}
                    helperText={props.error && props.error.errorMsg}
                    InputProps={{
                        inputComponent: props.mask === 'phone' ? TextMaskPhone :
                            undefined,
                    }}
                />
            )
    }

    return (
        <Grid item xs={12}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Box
                        paddingTop={props.type === 'label' ? 1 : 3}
                    >
                        <InputLabel>
                            <FormattedMessage id={props.title}/>
                            { props.required && !props.readOnly && '*' }
                        </InputLabel>
                    </Box>
                </Grid>
                <Grid item xs={9}>
                    {fieldComponent}
                </Grid>
            </Grid>
        </Grid>

        /*<Box
                width='30%'
                padding={1}
            >
                <InputLabel>
                    { props.title }
                    { props.required && !props.readOnly && '*' }
                </InputLabel>
            </Box>
            <Box
                width='70%'
            >
                <TextField
                    fullWidth
                    value={props.value}
                    onChange={handleChange}
                    variant='outlined'
                    InputProps={{
                        readOnly: props.readOnly,
                    }}
                    error={props.error}
                    helperText={props.error && props.error.errorMsg}
                />
            </Box>*/
    );
}
 
export default EnhancedField;