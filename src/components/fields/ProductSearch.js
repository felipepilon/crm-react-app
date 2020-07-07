import React, { useState, useEffect } from 'react';
import { Grid, Box, makeStyles, Button, Typography } from '@material-ui/core';
import ProductSearchCode from './ProductSearchCode';
import ProductSearchSize from './ProductSearchSize';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles((theme) => ({
    button: {
        marginLeft: theme.spacing(2)
    },
}));

const ProductSearch = (props) => {
    const [ product, setProduct ] = useState({});
    const [ size, setSize ] = useState('');

    const classes = useStyles();

    const handleProductSelect = (newProd) => {
        setProduct(newProd);
    }

    const handleSizeSelect = (newSize) => {
        setSize(newSize);
    }

    const handleAddClick = (e) => {
        e.preventDefault();
        props.handleAddProduct({product, size})
        setProduct({})
    }

    useEffect(() => {
        setSize('');
    }, [product])

    const addEnabled = product && product.product_id &&
        (!product.size_grid_id || size)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ProductSearchCode handleProductSelect={handleProductSelect}/>
            </Grid>
            {
                product.product_desc ?
                <Grid item xs={12}>
                    <Typography variant='body2'>
                        {product.product_desc}
                    </Typography>
                </Grid> : null
            }
            {
                product.size_grid_id ?
                <ProductSearchSize
                    size_grid_id={product.size_grid_id}
                    size={size}
                    handleSizeSelect={handleSizeSelect}
                /> : null
            }
            <Grid item xs={12}>
                <Box display='flex' justifyContent='flex-end'>
                    <Button className={classes.button} variant='contained'>
                        <FormattedMessage id='Clear'/>
                    </Button>
                    <Button className={classes.button} 
                        variant='contained' 
                        color='primary' 
                        disabled={!addEnabled}
                        onClick={handleAddClick}
                    >
                        <FormattedMessage id='Add'/>
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
}
 
export default ProductSearch;