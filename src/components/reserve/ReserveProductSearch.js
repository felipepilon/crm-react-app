import React from 'react';
import { makeStyles, Paper, Grid, Box, Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import ProductSearch from '../fields/ProductSearch';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2)
    },
}));

const ReserveProductSearch = (props) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box display='flex' justifyContent='center'>
                        <Typography variant='subtitle1'>
                            <FormattedMessage id='Select Products'/>
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <ProductSearch
                        handleAddProduct={props.handleAddProduct} 
                    />
                </Grid>
                {
                    props.products && props.products.length ?
                    props.products.map((prod, i) => {
                        return (
                            <Grid key={i} item xs={12}>
                                <Typography variant='body2'>
                                    {prod.product.product_code} - {prod.product.product_desc} - {prod.size}
                                </Typography>
                            </Grid>
                        )
                    }) : null
                }
            </Grid>
        </Paper>
    );
};
 
export default ReserveProductSearch;