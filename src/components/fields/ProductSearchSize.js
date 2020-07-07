import React, { useState, useEffect } from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { sizeGrid as getSizeGridApi } from '../../services/Product';

const ProductSearchSize = (props) => {
    const [ sizes, setSizes ] = useState([]);
    
    useEffect(() => {
        getSizeGridApi(props.size_grid_id)
        .then(res => {
            let i = 1;
            const newSizes = [];
            for(; i <= 50; i++)
            {
                if (res[`s${i}`])
                    newSizes.push(res[`s${i}`]);
            }

            setSizes(newSizes);
        });
    }, [props.size_grid_id])

    const handleSizeSelect = (e, size) => {
        props.handleSizeSelect(size);
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant='body2'>
                    <FormattedMessage id='Size'/>
                </Typography>
            </Grid>
            {
                sizes && sizes.length ?
                sizes.map((size, i) => {
                    return (
                        <Grid key={i} item xs={2}>
                            <Button 
                                fullWidth 
                                onClick={(e) => handleSizeSelect(e, size)}
                                variant='contained'
                                disableElevation
                                color={size === props.size ? 'primary' : 'default'}
                            >
                                {size}
                            </Button>
                        </Grid>
                    )
                }) : null
            }
        </Grid>
    );
}
 
export default ProductSearchSize;