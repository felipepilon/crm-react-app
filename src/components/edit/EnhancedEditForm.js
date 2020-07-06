import React from 'react';
import { Box, Typography, Grid, Button } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import EnhancedFieldGroup from './EnhancedFieldGroup';

const EnhancedEditForm = (props) => {
    const { data } = props;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box
                    display='flex'
                    justifyContent='center'
                    width='100%'
                >
                    <Typography variant='h5'>
                        <FormattedMessage id={props.title}/>
                    </Typography>
                </Box>
            </Grid>
            {
                props.fields &&
                props.fields.groups &&
                props.fields.groups.map((fieldGroup, i) => {
                    return (
                        <EnhancedFieldGroup
                            key={i}
                            title={fieldGroup.title}
                            fields={fieldGroup.fields}
                            data={data}
                            errors={props.errors}
                            handleFieldChange={props.handleFieldChange}
                        />
                    )
                })
            }
            <Grid item xs={12}>
                <Box
                    display='flex'
                    justifyContent='center'
                    width='100%'
                    paddingLeft={2}
                    paddingRight={2}

                >
                    <Grid container
                        spacing={2}
                        justify='center'
                    >
                        {
                            props.handleCancel &&
                            <Grid item xs={3}>
                                <Button
                                    variant='contained'
                                    fullWidth
                                    onClick={props.handleCancel}
                                >
                                    <FormattedMessage id='Cancel'/>
                                </Button>
                            </Grid>
                        }
                        {
                            props.handleReset &&
                            <Grid item xs={3}>
                                <Button
                                    variant='contained'
                                    fullWidth
                                    onClick={props.handleReset}
                                >
                                    <FormattedMessage id='Reset'/>
                                </Button>
                            </Grid>
                        }
                        <Grid item xs={4}>
                            <Button
                                variant='contained'
                                fullWidth
                                color='primary'
                                onClick={props.handleConfirm}
                            >
                                <FormattedMessage id='Confirm'/>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
}
 
export default EnhancedEditForm;