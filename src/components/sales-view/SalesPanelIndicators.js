import React, { useState, useEffect, Fragment } from 'react';
import {  Box, CircularProgress, useTheme } from '@material-ui/core';
import IndicatorGroup from './IndicatorGroup';
import { get_SalesSummary } from '../../services/Sale';

const SalesPanelIndicators = (props) => {
    const theme = useTheme();

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});

    const loadData = () => {
        setLoading(true);

        get_SalesSummary({
            periods: ['day', 'month', 'year'],
            filters: props.filters
        })
        .then((res) => {
            setTimeout(() => {
                setData(res);
                setLoading(false);
            }, 500);
        });
    }

    useEffect(() => {
        loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.filters]);
    
    return (
        <Fragment>
            <IndicatorGroup
                label='Total Sales Value'
                indicators={[
                    {label: 'Day', style: 'currency', value: (data.day && data.day.sum_paid_value) || 0},
                    {label: 'Month', style: 'currency', value: (data.month && data.month.sum_paid_value) || 0},
                    {label: 'Year', style: 'currency', value: (data.year && data.year.sum_paid_value) || 0},
                ]}
            />
            <IndicatorGroup
                label='Sales Average Value'
                indicators={[
                    {label: 'Day', style: 'currency', value: (data.day && data.day.avg_paid_value) || 0},
                    {label: 'Month', style: 'currency', value: (data.month && data.month.avg_paid_value) || 0},
                    {label: 'Year', style: 'currency', value: (data.year && data.year.avg_paid_value) || 0},
                ]}
            />
            <IndicatorGroup
                label='Sales Counter'
                indicators={[
                    {label: 'Day', value: (data.day && data.day.sale_count) || 0},
                    {label: 'Month', value: (data.month && data.month.sale_count) || 0},
                    {label: 'Year', value: (data.year && data.year.sale_count) || 0},
                ]}
            />
            <IndicatorGroup
                label='Total Sales Unit'
                indicators={[
                    {label: 'Day', value: (data.day && data.day.sum_total_qty) || 0},
                    {label: 'Month', value: (data.month && data.month.sum_total_qty) || 0},
                    {label: 'Year', value: (data.year && data.year.sum_total_qty) || 0},
                ]}
            />
            <IndicatorGroup
                label='Units Per Sale'
                indicators={[
                    {label: 'Day', value: (data.day && data.day.avg_total_qty) || 0},
                    {label: 'Month', value: (data.month && data.month.avg_total_qty) || 0},
                    {label: 'Year', value: (data.year && data.year.avg_total_qty) || 0},
                ]}
            />
            {
                loading ?
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
                    <CircularProgress/>
                </Box> : 
                null
            }
        </Fragment>
    );
}
 
export default SalesPanelIndicators;