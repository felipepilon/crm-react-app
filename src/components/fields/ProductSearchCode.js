import React, { useState, useEffect, Fragment } from 'react';
import { TextField, CircularProgress, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { products as getProductsApi } from '../../services/Product';

const minLength = 2;

const ProductSearchCode = (props) => {
    const [ open, setOpen ] = useState(false);
    const [ options, setOptions ] = useState([]);
    
    const loading = open && !options.length && props.productCode.length >= minLength;

    const handleChange = (e, selOpt) => {
        if (selOpt && selOpt.product_id)
            props.handleProductSelect(selOpt);
    }
    
    const handleInputChange = (e, newValue) => {
        props.setProductCode(newValue);
    }

    useEffect(() => {
        if (!loading)
            return undefined;

        getProductsApi({ product_code: `${props.productCode}%` })
        .then(result => {
            setOptions(result);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    useEffect(() => {
        if (!open || props.productCode < minLength)
            setOptions([]);
    }, [open, props.productCode])

    return (
        <Autocomplete
            style={{ width: '100%' }}
            options={options}
            open={open}
            onOpen={() => {setOpen(true)}}
            onClose={() => {setOpen(false)}}
            getOptionLabel={(opt) => opt.product_code}
            renderOption={(opt) => {
                return (
                    <Fragment>
                        <Typography variant='body2'>
                            {opt.product_code} - {opt.product_desc}
                        </Typography>
                    </Fragment>
                )
            }}
            noOptionsText={false}
            onChange={handleChange}
            inputValue={props.productCode}
            onInputChange={handleInputChange}
            selectOnFocus
            clearOnBlur={false}
            handleHomeEndKeys
            renderInput={(params) => 
                <TextField 
                    { ...params } 
                    size='small'
                    label='Product Code'
                    variant='outlined'
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <Fragment>
                                {loading ? <CircularProgress size={20}/> : null}
                            </Fragment>
                        ),
                    }}
                />
            }
        />
    )
}
 
export default ProductSearchCode;