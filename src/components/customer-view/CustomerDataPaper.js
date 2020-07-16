import React from 'react';
import { Paper, Typography, makeStyles } from '@material-ui/core';
import { FormattedMessage, FormattedDate } from 'react-intl';
import LabelMasks from '../../utils/LabelMasks';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2)
    },
}));

const CustomerDataPaper = (props) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Typography variant='body1'>
                <FormattedMessage id="CPF"/>
                : {LabelMasks.cpf(props.customer.cpf)}
            </Typography>
            <Typography variant='body1'>
                <FormattedMessage id="Birth Date"/>
                : <FormattedDate value={props.customer.birth_date} />
            </Typography>
            <Typography variant='body1'>
                <FormattedMessage id="Email"/>
                : {props.customer.email}
            </Typography>
            <Typography variant='body1'>
                <FormattedMessage id="Phone 1"/>
                : {LabelMasks.phone(props.customer.phone1)}
            </Typography>
            <Typography variant='body1'>
                <FormattedMessage id="Phone 2"/>
                : {LabelMasks.phone(props.customer.phone2)}
            </Typography>
            <Typography variant='body1'>
                <FormattedMessage id="ZIP"/>
                : {LabelMasks.zip(props.customer.zip)}
            </Typography>
            <Typography variant='body1'>
                <FormattedMessage id="Address 1"/>
                : {props.customer.addr1}
            </Typography>
            <Typography variant='body1'>
                <FormattedMessage id="Address 2"/>
                : {props.customer.addr2}
            </Typography>
            <Typography variant='body1'>
                <FormattedMessage id="Address 3"/>
                : {props.customer.addr3}
            </Typography>
            <Typography variant='body1'>
                <FormattedMessage id="City"/>
                : {props.customer.city}
            </Typography>
            <Typography variant='body1'>
                <FormattedMessage id="State"/>
                : {props.customer.state}
            </Typography>
        </Paper>
    );
}
 
export default CustomerDataPaper;