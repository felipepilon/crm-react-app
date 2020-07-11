import React, { useState, useEffect } from 'react';
import { Grid, Box, makeStyles, Button, Typography } from '@material-ui/core';
import ProductSearchCode from './ProductSearchCode';
import ProductSearchSize from './ProductSearchSize';
import { FormattedMessage } from 'react-intl';
import ProductSearchColor from './ProductSearchColor';
import QuantityInput from './QuantityInput';

const useStyles = makeStyles((theme) => ({
    button: {
        marginLeft: theme.spacing(2)
    },
}));

const ProductSearch = (props) => {
    const [ product, setProduct ] = useState({});
    const [ productCode, setProductCode ] = useState('');
    const [ size, setSize ] = useState('');
    const [ color, setColor ] = useState({});
    const [ quantity, setQuantity ] = useState(1);
    const [ errorMsg, setErrorMsg ] = useState('');

    const classes = useStyles();

    const handleAddClick = (e) => {
        e.preventDefault();

        if (props.products.find((p) => 
            p.product.product_id === product.product_id && 
            (!p.product.size_grid_id || p.size === size)
        )) {
            setErrorMsg('Already added');
            return;
        }

        props.handleAddProduct({product, size, color, quantity})
        setProduct({});
        setProductCode('');
    }

    const handleClearClick = (e) => {
        e.preventDefault();
        setProduct({});
        setProductCode('');
    }

    useEffect(() => {
        setSize('');
        setColor({});
        setErrorMsg('');
        setQuantity(1);
    }, [product])
    
    const addEnabled = product && product.product_id &&
        (!product.size_grid_id || size) &&
        (!product.has_colors || color.product_color_id) &&
        (quantity > 0)

    return (
        <Grid container spacing={2}>
            {
                errorMsg ?
                <Typography variant='body2' color='error'>
                    <FormattedMessage id={errorMsg}/>
                </Typography> :
                null
            }
            <Grid item xs={12}>
                <ProductSearchCode 
                    handleProductSelect={setProduct}
                    productCode={productCode}
                    setProductCode={setProductCode}
                />
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
                product.has_colors ?
                <ProductSearchColor
                    product={product}
                    color={color}
                    handleColorSelect={setColor}
                /> : null
            }
            {
                product.size_grid_id ?
                <ProductSearchSize
                    size_grid_id={product.size_grid_id}
                    size={size}
                    handleSizeSelect={setSize}
                /> : null
            }
            {
                product.product_id ?
                <Grid item xs={12}>
                    <QuantityInput
                        value={quantity}
                        handleChange={setQuantity}
                    />
                </Grid> : null
            }
            <Grid item xs={12}>
                <Box display='flex' justifyContent='flex-end'>
                    <Button className={classes.button} 
                        variant='contained' 
                        onClick={handleClearClick}
                    >
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