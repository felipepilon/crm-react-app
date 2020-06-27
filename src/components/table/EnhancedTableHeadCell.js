import React from 'react';
import { TableCell, TableSortLabel, Box } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';

const EnhancedTableHeadCell = (props) => {
    const width = props.columnSize && props.columnSize.width ? props.columnSize.width : null;

    return (
        <TableCell>
            <Box width={`${width}rem`}>
                <TableSortLabel>
                    <FormattedMessage id={props.title}/>
                </TableSortLabel>
            </Box>
        </TableCell>
    );
}
 
export default EnhancedTableHeadCell;