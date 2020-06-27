import React from 'react';
import { TableCell, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import HelpIcon from '@material-ui/icons/Help';

const EnhancedTablCell = (props) => {
    let cellContents;
    
    if (props.icon)
    {
        cellContents = (
            <IconButton
                onClick={() => props.handleCellClick(props.name, props._rowId)}
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
        cellContents = props.value;
    }

    return (
        <TableCell align={
            props.icon ? 'center' : 'left'
        }>
            { cellContents }
        </TableCell>
    );
}
 
export default EnhancedTablCell;