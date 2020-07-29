import React from 'react';
import { Paper, Box, Typography, Button, IconButton, useTheme } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import ProductSearch from '../fields/ProductSearch';
import DeleteIcon from '@material-ui/icons/Delete';

const ReserveProductSearch = (props) => {
    const theme = useTheme();

    const handleProceedClick = (e) => {
        e.preventDefault();
        props.handleNextStep();
    }

    const handleRemoveProduct = (e, index) => {
        e.preventDefault();
        props.handleRemoveProduct(index);
    }

    return (
        <Box display='flex' flexDirection='column'>

            <Box display='flex' justifyContent='center'>
                <Typography variant='h6'>
                    <FormattedMessage id='Select Products'/>
                </Typography>
            </Box>

            <ProductSearch
                products={props.products}
                handleAddProduct={props.handleAddProduct} 
            />

            {
                props.products.length ?
                props.products.map((prod, i) => {
                    return (
                        <Paper
                            key={i}
                            style={{
                                marginTop: theme.spacing(2),
                                display: 'flex', 
                                alignItems: 'center',
                            }}
                        >
                            <Box
                                flex='1'
                                padding={1}
                            >
                                <Typography variant='body1'>
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
                    )
                }) : null
            }
            {
                props.products.length ?
                <Box
                    display='flex'
                    justifyContent='flex-end'
                    marginTop={2}
                >
                    <Button
                        variant='contained'
                        disabled={props.products.length ? false : true}
                        color='primary'
                        onClick={handleProceedClick}
                    >
                        <FormattedMessage id='Continue' />
                    </Button>
                </Box> :
                null
            }
        </Box>
        /*
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
        </Paper>*/
    );
};
 
export default ReserveProductSearch;