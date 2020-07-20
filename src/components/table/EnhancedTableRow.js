import React from 'react';
import { TableRow } from '@material-ui/core';
import EnhancedTablCell from './EnhancedTableCell';

const EnhancedTableRow = (props) => {
    return (
        <TableRow>
            {
                props.columns.map((column, i) => {
                    const value = props.row[column.name] || '';

                    return (
                        <EnhancedTablCell
                            key={column.name}
                            icon={column.icon}
                            name={column.name}
                            mask={column.mask}
                            colIndex={i}
                            rowIdx={props.row._i}
                            value={value}
                            handleCellClick={props.handleCellClick}
                        />
                    );
                })
            }
        </TableRow>
    );
}
 
export default EnhancedTableRow;