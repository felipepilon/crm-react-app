import React from 'react';
import { TableHead, TableRow } from '@material-ui/core';
import EnhancedTableHeadCell from './EnhancedTableHeadCell';

const EnhancedTableHead = (props) => {
    return (
        <TableHead>
            <TableRow>
                {
                    props.columns.map(column => {
                        return (
                            <EnhancedTableHeadCell
                                key={column.name}
                                title={column.title}
                                columnSize={props.columnSizes[column.name]}
                            />
                        )
                    })
                }
            </TableRow>
        </TableHead>
    );
}
 
export default EnhancedTableHead;