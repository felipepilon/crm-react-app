import React from 'react';
import { TableCell, TableSortLabel } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

const EnhancedTableHeadCell = (props) => {
    return (
        <TableCell>
            <TableSortLabel>
                <FormattedMessage id={props.title}/>
            </TableSortLabel>
        </TableCell>
    );
}
 
export default EnhancedTableHeadCell;