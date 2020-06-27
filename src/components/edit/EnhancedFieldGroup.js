import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import EnhancedTextField from './EnhancedField';
import { getObjectValue } from '../../utils/ObjectValueReader';
import { FormattedMessage } from 'react-intl';

const EnhancedFieldGroup = (props) => {
    return (
        <Grid item xs={12}>
            <Box
                display='flex'
                width='100%'
                border={1}
                borderRadius='borderRadius'
                borderColor='grey.500'
                padding={2}
            >
                <Grid container spacing={2}>
                    {
                        props.title &&
                        <Grid item xs={12}>
                            <Typography variant='h6'>
                                <FormattedMessage id={props.title}/>
                            </Typography>
                        </Grid>
                    }
                    {
                        props.fields &&
                        props.fields.map(field => {
                            return (
                                <EnhancedTextField
                                    key={field.name}
                                    name={field.name}
                                    title={field.title}
                                    type={field.type}
                                    mask={field.mask}
                                    value={getObjectValue(props.data, field.name)}
                                    handleFieldChange={props.handleFieldChange}
                                />
                            )
                        })
                    }
                </Grid>
            </Box>
        </Grid>
        /*<Fragment>
        <Grid item xs={12}></Grid>
            <Box
                display='flex'
                flexDirection='column'
                border={1}
                borderRadius='borderRadius'
                borderColor='primary.main'
                width='100%'
            >
                {
                    props.fields &&
                    props.fields.map(field => {
                        return (
                            <EnhancedTextField
                                key={field.name}
                                name={field.name}
                                title={field.title}
                                handleChange={field.handleChange}
                                value={getObjectValue(props.data, field.name)}
                                error={getObjectValue(props.errors, field.name)}
                            />
                        )
                    })
                }
            </Box>
        </Fragment>*/
    );
}
 
export default EnhancedFieldGroup;