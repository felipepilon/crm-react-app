import React from 'react';
import TableCellEditIcon from './TableCellEditIcon';
import TableCellDefault from './TableCellDefault';
import TableCellIntl from './TableCellIntl';
import TableCellIntlSplit from './TableCellIntlSplit';
import TableCellIntlLink from './TableCellIntlLink';
import EnhancedTableCellDatetime from './EnhancedTableCellDatetime';
import TableCellDate from './TableCellDate';
import TableCellMasked from './TableCellMasked';

const components = {
    default: TableCellDefault,
    masked: TableCellMasked,
    date: TableCellDate,
    editIcon: TableCellEditIcon,
    intlSplit: TableCellIntlSplit,
    intl: TableCellIntl,
    intlLink: TableCellIntlLink
}

const TableCell = ({format, ...other}) => {
    const Component = components[format || 'default'] || TableCellDefault;

    return (
        <Component {...other}/>
    )
}
 
export default TableCell;