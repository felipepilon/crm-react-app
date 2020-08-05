import React from 'react';
import { TableHead, TableRow, TableCell } from '@material-ui/core';
import EnhancedTableHeadCell from './EnhancedTableHeadCell';

const EnhancedTableHead = (props) => {
    return (
        <TableHead>
            <TableRow>
                {
                    props.colapsableColumn ?
                    <TableCell/> :
                    null
                }
                {
                    props.columns.map(column => {
                        return (
                            <EnhancedTableHeadCell
                                key={column.name}
                                title={column.title}
                                width={column.width}
                            />
                        )
                    })
                }
            </TableRow>
        </TableHead>
    );
}
 
export default EnhancedTableHead;