import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

const ReserveProductData = (props) => {
    if (!props.customer)
        return null;

    return (
        <Fragment>
            <Typography variant='body1'>
                <FormattedMessage id="Name"/>
                : Dados do produto
            </Typography>
        </Fragment>
    );
}
 
export default ReserveProductData;