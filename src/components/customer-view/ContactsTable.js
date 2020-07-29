import React, { useState, useEffect } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EnhancedTable from '../table/EnhancedTable'
import { FormattedMessage } from 'react-intl';
import { Box } from '@material-ui/core';
import { list as listContactsApi } from '../../services/Contact';

const ContactsTable = (props) => {
    const [ expanded, setExpanded ] = useState(false);
    const [ data, setData ] = useState([]);
    const [ columns ] = useState([
        { name: 'contact_start_date', title: 'Contact Date', mask: 'datetime' },
        { name: 'salesman_name', title: 'Salesman', },
        { name: 'reasons', title: 'Reason(s)', intlSplit: true },
        { name: 'another_reason', title: 'Another Reason' },
        { name: 'contact_via', title: 'Via', intl: true },
        { name: 'feedback', title: 'Feedback', intl: true },
        { name: 'another_feedback', title: 'Another Feedback' },
        { name: 'notes', title: 'Notes' },
        { name: 'call_duration', title: 'Duration', mask: 'timer' },
        { name: 'reminder_date', title: 'Call Again At', mask: 'date' },
        { name: 'store_name', title: 'Store' },
    ]);
    const [ lastUpdate, setLastUpdate ] = useState(null);

    const handleChange = () => {
        setExpanded(!expanded);
    }

    const loadData = () => {
        setTimeout(() => {
            listContactsApi({
                contact_id: props.contact_id,
                status: 'Completed',
                limit: 10,
                order_by: [
                    [ 'contact_start_date', 'desc' ],
                ]
            })
            .then((result) => {
                console.log(data);
                setData(result);
                setLastUpdate(new Date());
            });
        }, 500)
    }

    useEffect(() => {
        if (expanded && !lastUpdate)
            loadData();
    // eslint-disable-next-line
    }, [expanded]);

    useEffect(() => {
        if (props.lastUpdate && props.lastUpdate > lastUpdate)
            loadData();
    // eslint-disable-next-line
    }, [props.lastUpdate]);

    return (
        <Box
            width='100%'
        >
            <Accordion expanded={expanded} onChange={handleChange}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                >
                    <Typography variant='subtitle1'><FormattedMessage id='Contacts'/></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <EnhancedTable
                        columns={columns}
                        data={data}
                        dense='denseDisabled'
                        dataStatus={lastUpdate ? 'loaded' : 'loading'}
                    />
                    
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

export default ContactsTable;