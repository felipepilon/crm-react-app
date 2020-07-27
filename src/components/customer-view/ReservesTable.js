import React, { useState, useEffect } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EnhancedTable from '../table/EnhancedTable'
import { FormattedMessage } from 'react-intl';
import { Box } from '@material-ui/core';
import { detailedByCustomer as getReserveDetailsApi } from '../../services/Reserve';

const ReservesTable = (props) => {
    const [ expanded, setExpanded ] = useState(false);
    const [ data, setData ] = useState([]);
    const [ dataStatus, setSataStatus ] = useState('waiting');
    const [ columns ] = useState([
        { name: '_edit', title: 'Edit', icon: 'edit', },
        { name: 'reserve_date', title: 'Reserve Date', },
        { name: 'store_name', title: 'Store', },
        { name: 'salesman_name', title: 'Salesman', },
        { name: 'product_code', title: 'Product', },
        { name: 'product_desc', title: 'Description', },
        { name: 'product_color_desc', title: 'Color', },
        { name: 'size', title: 'Size', },
        { name: 'quantity', title: 'Quantity', },
    ]);

    const handleChange = () => {
        setExpanded(!expanded);
    }

    useEffect(() => {
        if (expanded && dataStatus === 'waiting')
        {
            setSataStatus('loading');
            getReserveDetailsApi({ customer_id: props.customer_id })
            .then((result) => {
                setData(result);
                setSataStatus('loaded');
            });
        }
    // eslint-disable-next-line
    }, [expanded]);

    return (
        <Box
            width='100%'
        >
            <Accordion expanded={expanded} onChange={handleChange}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                >
                    <Typography variant='subtitle1'><FormattedMessage id='Reserves'/></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {
                        dataStatus === 'loaded' ?
                        <EnhancedTable
                            columns={columns}
                            data={data}
                            dense='denseDisabled'
                            dataStatus={dataStatus}
                        /> :
                        dataStatus
                    }
                    
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

export default ReservesTable;