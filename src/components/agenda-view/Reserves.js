import { CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { get_SumToDoReserve, get_ToDoReserve } from '../../services/Contact';
import AgendaGroupAccordion from './AgendaGroupAccordion';
import AgendaGroupCaption from './AgendaGroupCaption';
import AgendaGroupItem from './AgendaGroupItem';
import AgendaGroupWrapper from './AgendaGroupWrapper';

const getDateNoOffset = (date) => new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
const getDateString = (date) => getDateNoOffset(date).toISOString().substr(0, 10);
const compareDate = (date1Str, date2) => date1Str.substr(0, 10) === getDateString(date2);

const sortCustomers = (a, b) => {
    if (a.allow_crm_contact && !b.allow_crm_contact) return -1;
    if (!a.allow_crm_contact && b.allow_crm_contact) return 1;
    if (!a.contact_count && b.contact_count) return -1;
    if (a.contact_count && !b.contact_count) return 1;
    
    return (a.name < b.name) ? -1 : 1;
}

const Reserves = () => {
    const [contentStatus, setContentStatus] = useState('none');
    const [contentData, setContentData] = useState([]);
    const [summaryData, setSummaryData] = useState({});
    const [summaryStatus, setSummaryStatus] = useState('none');

    const today = new Date();
    const todays = contentData.filter((rsv) => compareDate(rsv.reminder_date, today)).sort(sortCustomers);
    
    const handleLoadSummary = () => {
        setSummaryStatus('loading')
        get_SumToDoReserve({reminder_date: getDateString(today)})
        .then((res) => {
            setSummaryData(res);
            setSummaryStatus('loaded');
        });
    }

    const handleLoadContent = () => {
        setContentStatus('loading')
        get_ToDoReserve({reminder_date: getDateString(today)})
        .then((res) => {
            setContentData(res);
            setContentStatus('loaded');
        });
    }

    return (
        <AgendaGroupAccordion 
            title='Reserves' 
            contentStatus={contentStatus} 
            loadContentFnc={handleLoadContent} 
            loadSummaryFnc={handleLoadSummary}
            summaryData={summaryData}
            summaryStatus={summaryStatus}
        >
            {
                todays.length ?
                <AgendaGroupWrapper>
                    <AgendaGroupCaption title='Todays'/>
                    {
                        todays.map((cus) => {
                            return (
                                <AgendaGroupItem key={cus.customer_id} customer={cus} reason="Reserve"/>
                            );
                        })
                    }
                </AgendaGroupWrapper> : null
            }
            {
                contentStatus === 'loading' &&
                <CircularProgress size={20}/>
            }
        </AgendaGroupAccordion>
    );
}
 
export default Reserves;