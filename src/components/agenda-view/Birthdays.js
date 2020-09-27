import { CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { get_SumToDoBirthday, get_ToDoBirthday } from '../../services/Contact';
import AgendaGroupAccordion from './AgendaGroupAccordion';
import AgendaGroupCaption from './AgendaGroupCaption';
import AgendaGroupItem from './AgendaGroupItem';
import AgendaGroupWrapper from './AgendaGroupWrapper';

const getDateNoOffset = (date) => new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
const getDateMonthDay = (date) => getDateNoOffset(date).toISOString().substr(5, 5);
const getDateYear = (date) => getDateNoOffset(date).getFullYear();
const compareDate = (date1Str, date2) => date1Str === getDateMonthDay(date2);

const Birthdays = () => {
    const [contentStatus, setContentStatus] = useState('none');
    const [contentData, setContentData] = useState([]);
    const [summaryData, setSummaryData] = useState({});
    const [summaryStatus, setSummaryStatus] = useState('none');

    const today = new Date();
    const yesterday = new Date(new Date().setDate(today.getDate() - 1));
    const tomorrow = new Date(new Date().setDate(today.getDate() + 1));
    const todays = contentData.filter((bth) => compareDate(bth.birthday, today));
    const yesterdays = contentData.filter((bth) => compareDate(bth.birthday, yesterday));
    const tomorrows = contentData.filter((bth) => compareDate(bth.birthday, tomorrow));

    const handleLoadSummary = () => {
        setSummaryStatus('loading')
        setTimeout(() => {
            get_SumToDoBirthday({birthday: getDateMonthDay(today), year: getDateYear(today)})
            .then((res) => {
                setSummaryData(res);
                setSummaryStatus('loaded');
            })
        }, 500)
    }

    const handleLoadContent = () => {
        setContentStatus('loading')
        setTimeout(() => {
            get_ToDoBirthday({birthday_start: getDateMonthDay(yesterday), birthday_end: getDateMonthDay(tomorrow), year: getDateYear(today)})
            .then((res) => {
                setContentData(res);
                setContentStatus('loaded');
            })
        }, 1000)
    }

    return (
        <AgendaGroupAccordion 
            title='Birthdays' 
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
                                <AgendaGroupItem key={cus.customer_id} customer={cus}/>
                            );
                        })
                    }
                </AgendaGroupWrapper> : null
            }
            {
                yesterdays.length ?
                <AgendaGroupWrapper marginTop={1}>
                    <AgendaGroupCaption title='Yesterdays'/>
                    {
                        yesterdays.map((cus) => {
                            return (
                                <AgendaGroupItem key={cus.customer_id} customer={cus}/>
                            );
                        })
                    }
                </AgendaGroupWrapper> : null
            }
            {
                tomorrows.length ?
                <AgendaGroupWrapper marginTop={1}>
                    <AgendaGroupCaption title='Tomorrows'/>
                    {
                        tomorrows.map((cus) => {
                            return (
                                <AgendaGroupItem key={cus.customer_id} customer={cus}/>
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
 
export default Birthdays;