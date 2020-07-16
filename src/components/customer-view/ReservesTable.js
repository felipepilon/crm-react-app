import React, { useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Typography } from '@material-ui/core';

const ReservesTable = () => {
    const [ data, setData ] = useState([]);
    const [ expanded, setExpanded ] = useState(false);


    return (
        <Accordion expanded={expanded} onChange={setExpanded(!expanded)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
            >
                <AccordionDetails>
                    <Typography>
                        Reserve
                    </Typography>
                </AccordionDetails>
            </AccordionSummary>
        </Accordion>
    );
}
 
export default ReservesTable;