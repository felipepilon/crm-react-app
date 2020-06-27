import React from 'react';
import { Box, Typography, Grid, Button } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import EnhancedFieldGroup from './EnhancedFieldGroup';

const EnhancedEditForm = (props) => {
    const { data } = props;

    const handleSubmit = () => {
        console.log('handleSubmit')
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box
                        display='flex'
                        justifyContent='center'
                        width='100%'
                        paddingTop={2}
                        paddingLeft={2}
                        paddingRight={2}
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
                            <Grid item xs={3}>
                                <Button
                                    variant='contained'
                                    fullWidth
                                    onClick={props.handleCancel}
                                >
                                    <FormattedMessage id='Cancel'/>
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    variant='contained'
                                    fullWidth
                                    onClick={props.handleRefresh}
                                >
                                    <FormattedMessage id='Refresh'/>
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    variant='contained'
                                    fullWidth
                                    color='primary'
                                    type='submit'
                                >
                                    <FormattedMessage id='Confirm'/>
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
}
 
export default EnhancedEditForm;