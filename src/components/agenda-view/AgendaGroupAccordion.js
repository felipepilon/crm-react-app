import { Accordion, AccordionDetails, AccordionSummary, Box, CircularProgress, Typography, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FormattedMessage } from 'react-intl';

const AgendaGroupAccordion = ({loadContentFnc, loadSummaryFnc, summaryData, summaryStatus, children, title, contentStatus}) => {
    const theme = useTheme();

    const [data, setData] = useState({});
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            loadSummaryFnc()

            setLoading(false);
        }, 1000)
    }, [])

    useEffect(() => {
        if (expanded && contentStatus === 'none')
        {
            loadContentFnc();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expanded]);

    return (
        <Box display = 'flex' position='relative'>
            <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)} style={{width: '100%'}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box display='flex' width='100%'>
                        <Typography variant='body1' style={{flex: '1'}}><FormattedMessage id={title}/></Typography>
                        <Typography variant='body1'>{summaryData.done || 0} / {summaryData.to_do || 0}</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails style={{display: 'flex', flexDirection: 'column'}}>
                    {children}
                </AccordionDetails>
            </Accordion>
            {
                summaryStatus !== 'loaded' ?
                <Box
                    display='flex'
                    position='absolute'
                    height='100%'
                    width='100%'
                    justifyContent='center'
                    alignItems='center'
                    bgcolor={theme.palette.background.paper}
                    zIndex='1'
                    style={{opacity: 0.3}}
                >
                    <CircularProgress size={20}/>
                </Box> : 
                null
            }
        </Box>
    );
}
 
export default AgendaGroupAccordion;