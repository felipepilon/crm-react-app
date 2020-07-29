import React from 'react';
import { TableCell, TableSortLabel, Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

const EnhancedTableHeadCell = (props) => {
    return (
        <TableCell>
            <TableSortLabel>
                <Typography variant='inherit' noWrap>
                    <FormattedMessage id={props.title}/>
                </Typography>
            </TableSortLabel>
        </TableCell>
    );
}
 
export default EnhancedTableHeadCell;