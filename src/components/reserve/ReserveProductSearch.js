import React from 'react';
import { makeStyles, Paper, Grid, Box, Typography, Button, IconButton } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import ProductSearch from '../fields/ProductSearch';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2)
    },
    button: {
        marginLeft: theme.spacing(2)
    },
    papperItem: {
        display: 'flex'
    },
}));

const ReserveProductSearch = (props) => {
    const classes = useStyles();

    const handleProceedClick = (e) => {
        e.preventDefault();
        props.handleNextStep();
    }

    const handleRemoveProduct = (e, index) => {
        e.preventDefault();
        props.handleRemoveProduct(index);
    }

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
                        products={props.products}
                        handleAddProduct={props.handleAddProduct} 
                    />
                </Grid>
                {
                    props.products.length ?
                    props.products.map((prod, i) => {
                        return (
                            <Grid key={i} item xs={12}>
                                <Paper
                                    className={classes.papperItem}
                                >
                                    <Box
                                        flex='1'
                                        padding={2}
                                    >
                                        <Typography variant='body2'>
                                            {`${prod.product.product_code} - ${prod.product.product_desc}`}
                                            {prod.product.has_colors ? ` - ${prod.color.product_color_desc}` : ''}
                                            {prod.product.size_grid_id ? ` - ${prod.size}` : ''}
                                            {` - ${prod.quantity}`}
                                        </Typography>
                                    </Box>
                                    <IconButton onClick={(e) => handleRemoveProduct(e, i)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </Paper>
                            </Grid>
                        )
                    }) : null
                }
                {
                    props.products.length ?
                    <Grid item xs={12}>
                        <Box
                            display='flex'
                            justifyContent='flex-end'
                        >
                            <Button
                                variant='contained'
                                disabled={props.products.length ? false : true}
                                color='primary'
                                onClick={handleProceedClick}
                                className={classes.button}
                            >
                                <FormattedMessage id='Continue' />
                            </Button>
                        </Box>
                    </Grid> :
                    null
                }
            </Grid>
        </Paper>
    );
};
 
export default ReserveProductSearch;