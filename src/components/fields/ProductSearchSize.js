import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, useTheme } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { sizeGrid as getSizeGridApi } from '../../services/Product';

const ProductSearchSize = (props) => {
    const [ sizes, setSizes ] = useState([]);

    const theme = useTheme();
    
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
        e.preventDefault();
        props.handleSizeSelect(size);
    }

    return (
        <Box
            display='flex'
            flexDirection='column'
            width='100%'
            marginTop={1}
        >
            <Typography variant='subtitle1'>
                <FormattedMessage id='Size'/>
            </Typography>
            <Box
                display='flex'
                width='100%'
                flexWrap='wrap'
            >
                {
                    sizes.length ?
                    sizes.map((size, i) => {
                        return (
                            <Button 
                                key={i}
                                style={{marginRight: theme.spacing(1), marginTop: theme.spacing(1)}}
                                onClick={(e) => handleSizeSelect(e, size)}
                                variant='contained'
                                disableElevation
                                color={size === props.size ? 'primary' : 'default'}
                                size='small'
                            >
                                {size}
                            </Button>
                        )
                    }) : null
                }
            </Box>
        </Box>
    );
}
 
export default ProductSearchSize;