import React from 'react';
import { TableCell, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import HelpIcon from '@material-ui/icons/Help';
import EnhancedFieldLabel from './EnhancedFieldLabel';
import { Link } from 'react-router-dom';

const EnhancedTablCell = (props) => {
    let cellContents;

    if (props.column.type && props.column.type.includes('icon'))
    {
        cellContents = (
            <IconButton
                size={props.dense.includes('dense') ? 'small' : 'medium'}
                component={Link}
                to={props.column.to(props.row)}
            >
                {
                    props.column.type.includes('edit') ?
                    <EditIcon/> :
                    <HelpIcon/>
                }
            </IconButton>
        )
    }
    else
    {
        const value = props.column.value || props.row[props.column.name] || null;

        cellContents = <EnhancedFieldLabel
            value={value}
            mask={props.column.mask}
            intl={props.column.intl}
            intlSplit={props.column.intlSplit}
            wrap={props.column.wrap}
            type={props.column.type}
            rowIdx={props.rowIdx}
            name={props.name}
        />
    }

    return (
        <TableCell 
            align={
                props.icon ? 'center' : 'left'
            }
        >
            { cellContents }
        </TableCell>
    );
}
 
export default EnhancedTablCell;