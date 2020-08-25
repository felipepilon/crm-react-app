import React, { useState, Fragment, useEffect } from 'react';
import { TableRow, TableCell, IconButton } from '@material-ui/core';
import EnhancedTablCell from './EnhancedTableCell';
import ColapsableTableRow from './ColapsableTableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const EnhancedTableRow = (props) => {
    const [ openColapsedTable, setOpenColapsedTable ] = useState(false);

    useEffect(() => {
        setOpenColapsedTable(false);
    }, [props.row])

    return (
        <Fragment>
            <TableRow>
                {
                    props.colapsableColumns ?
                    <TableCell>
                    <IconButton 
                        size={props.dense.includes('dense') ? 'small' : 'medium'}
                        onClick={() => setOpenColapsedTable(!openColapsedTable)}
                    >
                        {openColapsedTable ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon />}
                    </IconButton>
                    </TableCell> :
                    null
                }
                {
                    props.columns.map((column, i) => {
                        const value = props.row[column.name] || '';

                        return (
                            <EnhancedTablCell
                                key={column.name}
                                icon={column.icon}
                                name={column.name}
                                mask={column.mask}
                                intl={column.intl}
                                wrap={column.wrap}
                                dense={props.dense}
                                intlSplit={column.intlSplit}
                                colIndex={i}
                                rowIdx={props.row._i}
                                value={value}
                                handleCellClick={props.handleCellClick}
                            />
                        );
                    })
                }
            </TableRow>
            {
                openColapsedTable ?
                <ColapsableTableRow
                    colSpan={props.columns.length + 1}
                    open={openColapsedTable}
                    dense={props.dense}
                    columns={props.colapsableColumns}
                    refRow={props.row}
                    loadColapsableData={props.loadColapsableData}
                /> :
                null
            }
        </Fragment>
    );
}
 
export default EnhancedTableRow;