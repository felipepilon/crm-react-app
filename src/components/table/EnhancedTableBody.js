import React from 'react';
import { TableBody } from '@material-ui/core';
import EnhancedTableRow from './EnhancedTableRow';

const EnhancedTableBody = (props) => {
    return (
        <TableBody>
            {
                props.data && props.data.length ?
                props.data.map((row, index) => {
                    return (
                        <EnhancedTableRow
                            key={index}
                            columns={props.columns}
                            row={row}
                            columnSizes={props.columnSizes}
                            handleCellClick={props.handleCellClick}
                        />
                    );
                }) : null
            }
        </TableBody>
    );
}
 
export default EnhancedTableBody;