import React from 'react';
import { TableCell, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import HelpIcon from '@material-ui/icons/Help';
import EnhancedFieldLabel from './EnhancedFieldLabel';

const EnhancedTablCell = (props) => {
    let cellContents;

    const handleCellClick = (name, rowId) => {
        console.log('EnhancedTablCell.handleCellClick. => name: ', name, ', rowId: ', rowId);

        if (props.handleCellClick)
            props.handleCellClick(name, rowId)
        else
            console.log('EnhancedTablCell.handleCellClick no handler defined. => name: ', name, ', rowId: ', rowId);
    }
    
    if (props.icon)
    {
        cellContents = (
            <IconButton

                onClick={() => handleCellClick(props.name, props.rowIdx)}
            >
                {
                    props.icon === 'edit' ?
                    <EditIcon/> :
                    <HelpIcon/>
                }
            </IconButton>
        )
    }
    else
    {
        cellContents = <EnhancedFieldLabel
            value={props.value}
            mask={props.mask}
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