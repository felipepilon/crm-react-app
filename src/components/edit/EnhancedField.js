import React from 'react';
import { InputLabel, Grid, Box } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import EnhancedFieldLabel from './EnhancedFieldLabel';
import EnhancedFieldInput from './EnhancedFieldInput';

const EnhancedField = props => {
    let fieldComponent;

    if (props.type === 'label') {
        fieldComponent = (
            <EnhancedFieldLabel
                value={props.value}
                mask={props.mask}
            />
        );
    }
    else {
        fieldComponent = (
            <EnhancedFieldInput
                name={props.name}
                value={props.value}
                error={props.error}
                handleFieldChange={props.handleFieldChange}
                mask={props.mask}
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
    );
}
 
export default EnhancedField;