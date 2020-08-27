import React from 'react';
import { Box, Typography, Button, Container, useTheme, CircularProgress } from '@material-ui/core';
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
                position='relative'
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
                {
                    props.loading ?
                    <Box
                        display='flex'
                        position='absolute'
                        height='100%'
                        width='100%'
                        justifyContent='center'
                        alignItems='center'
                        bgcolor={theme.palette.background.paper}
                        zIndex='1'
                        style={{opacity: 0.3}}
                    >
                        <CircularProgress/>
                    </Box> : 
                    null
                }
            </Box>
        </Container>
    );
}
 
export default EnhancedEditForm;