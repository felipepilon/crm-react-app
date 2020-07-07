import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import LabelMasks from '../../utils/LabelMasks';

const ReserveCustomerData = (props) => {
    if (!props.customer)
        return null;

    return (
        <Fragment>
            <Typography variant='body2'>
                <FormattedMessage id="Name"/>
                : {props.customer.name}
            </Typography>
            <Typography variant='body2'>
                <FormattedMessage id="CPF"/>
                : {LabelMasks.cpf(props.customer.cpf)}
            </Typography>
            <Typography variant='body2'>
                <FormattedMessage id="Email"/>
                : {props.customer.email}
            </Typography>
            <Typography variant='body2'>
                <FormattedMessage id="Phone 1"/>
                : {LabelMasks.phone(props.customer.phone1)}
            </Typography>
            <Typography variant='body2'>
                <FormattedMessage id="Phone 2"/>
                : {LabelMasks.phone(props.customer.phone2)}
            </Typography>
            <Typography variant='body2'>
                <FormattedMessage id="ZIP"/>
                : {LabelMasks.zip(props.customer.zip)}
            </Typography>
            <Typography variant='body2'>
                <FormattedMessage id="Address 1"/>
                : {props.customer.addr1}
            </Typography>
            <Typography variant='body2'>
                <FormattedMessage id="Address 2"/>
                : {props.customer.addr2}
            </Typography>
            <Typography variant='body2'>
                <FormattedMessage id="Address 3"/>
                : {props.customer.addr3}
            </Typography>
            <Typography variant='body2'>
                <FormattedMessage id="City"/>
                : {props.customer.city}
            </Typography>
            <Typography variant='body2'>
                <FormattedMessage id="State"/>
                : {props.customer.state}
            </Typography>
        </Fragment>
    );
}
 
export default ReserveCustomerData;