import { TableCell, TableSortLabel, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const ColumnHeader = ({title}) => {
    return (
        <TableCell>
            <TableSortLabel>
                <Typography variant='inherit' noWrap>
                    {
                        title ?
                        <FormattedMessage id={title}/> :
                        ''
                    }
                </Typography>
            </TableSortLabel>
        </TableCell>
    );
}
 
export default ColumnHeader;