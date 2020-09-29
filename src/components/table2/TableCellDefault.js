import React from 'react';
import { TableCell, Typography } from '@material-ui/core';

const TableCellDefault = ({value}) => {
    return (
        <TableCell>
            <Typography variant='inherit' noWrap>
                {value}
            </Typography>
        </TableCell>
    );
}
 
export default TableCellDefault;