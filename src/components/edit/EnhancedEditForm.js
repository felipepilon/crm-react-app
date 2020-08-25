import React from 'react';
import { Box, Typography, Grid, Button, Container, useTheme } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import EnhancedFieldGroup from './EnhancedFieldGroup';

const EnhancedEditForm = (props) => {
    const { data } = props;

    const theme = useTheme();

    return (
        <Container>
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                width='100%'
            >
                <Typography style={{marginTop: theme.spacing(1)}} variant='h5'>
                    <FormattedMessage id={props.title}/>
                </Typography>
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
                <Box display='flex' marginTop={1}>
                    {
                        props.handleCancel &&
                        <Button
                            variant='contained'
                            onClick={props.handleCancel}
                            style={{marginRight: theme.spacing(1)}}
                        >
                            <FormattedMessage id='Cancel'/>
                        </Button>
                    }
                    {
                        props.handleReset &&
                        <Button
                            variant='contained'
                            onClick={props.handleReset}
                            style={{marginRight: theme.spacing(1)}}
                        >
                            <FormattedMessage id='Reset'/>
                        </Button>
                    }
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={props.handleConfirm}
                    >
                        <FormattedMessage id='Confirm'/>
                    </Button>
                </Box>
            </Box>
        </Container>
    );

    /*
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
        </Grid>*/
}
 
export default EnhancedEditForm;