import React, { Fragment } from 'react';
import { Typography, makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    papperItem: {
        display: 'flex',
        padding: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
}));

const ReserveProductData = (props) => {

    const classes = useStyles();

    if (!props.products || !props.products.length)
        return null;

    return (
        <Fragment>
            {
                props.products.map((prod, i) => {
                    return (
                        <Paper
                            key={i}
                            className={classes.papperItem}
                        >
                            <Typography variant='body2'>
                                {`${prod.product.product_code} - ${prod.product.product_desc}`}
                                {prod.product.has_colors ? ` - ${prod.color.product_color_desc}` : ''}
                                {prod.product.size_grid_id ? ` - ${prod.size}` : ''}
                                {` - ${prod.quantity}`}
                            </Typography>
                        </Paper>
                    )
                })
            }
        </Fragment>
    );
}
 
export default ReserveProductData;