import React, { useState, useEffect } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EnhancedTable from '../table/EnhancedTable'
import { FormattedMessage } from 'react-intl';
import { Box } from '@material-ui/core';
import { get_ReserveDetails } from '../../services/Reserve';

const ReservesTable = (props) => {
    const [ expanded, setExpanded ] = useState(false);
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ columns ] = useState([
        { name: 'reserve_date', title: 'Reserve Date', mask: 'datetime' },
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
        if (expanded && loading)
        {
            get_ReserveDetails({ customer_id: props.customer_id })
            .then((result) => {
                setData(result);
                setLoading(false);
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
                    <EnhancedTable
                        columns={columns}
                        data={data}
                        dense='dense disabled'
                        loading={loading}
                    />
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

export default ReservesTable;