import React from 'react';
import TableCellEditIcon from './TableCellEditIcon';
import TableCellDefault from './TableCellDefault';
import EnhancedTableCellIntl from './EnhancedTableCellIntl';
import EnhancedTableCellIntlSplit from './EnhancedTableCellIntlSplit';
import EnhancedTableCellIntlLink from './EnhancedTableCellIntlLink';
import EnhancedTableCellDatetime from './EnhancedTableCellDatetime';
import TableCellDate from './TableCellDate';
import TableCellMasked from './TableCellMasked';

const components = {
    default: TableCellDefault,
    masked: TableCellMasked,
    date: TableCellDate,
    editIcon: TableCellEditIcon
}

const TableCell = ({format, ...other}) => {
    const Component = components[format || 'default'] || TableCellDefault;

    return (
        <Component {...other}/>
    )
}
 
export default TableCell;