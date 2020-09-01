import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, useTheme } from '@material-ui/core';
import { FormattedMessage, useIntl } from 'react-intl';
import EnhancedTable from '../table/EnhancedTable';
import { useHistory, useLocation } from 'react-router-dom';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useLastLocation } from 'react-router-last-location';
import EnhancedButtonLink from './EnhancedButtonLink';

const EnhancedListPage = (props) => {
    const intl = useIntl();
    const theme = useTheme();
    const hist = useHistory();
    const loc = useLocation();
    const lastLoc = useLastLocation();

    const restoreState = loc.state && lastLoc && lastLoc.pathname !== loc.pathname ? true : false;

    const [ data, setData ] = useState((restoreState && loc.state.data) || null);
    const [ loading, setLoading ] = useState(true);

    const findData = () => {
        props.findDataFnc(props.findDataParams)
        .then((res) => {
            setTimeout(() => {
                setData(res);
                setLoading(false);
            }, 500);
        });
    }

    const handleRefreshClick = () => {
        setLoading(true);
        findData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => hist.replace(loc.pathname, { ...loc.state, ...{data} }), [data]);

    useEffect(() => {
        document.title = intl.formatMessage({ id: props.title });

        if (!data)
            findData();
        else
            setLoading(false);
    // eslint-disable-next-line
    }, []);

    return (
        <Box
            display='flex'
            flexDirection='column'
            minHeight='0'
            height='100%'
        >
            <Box display='flex' padding={2}>
                <Typography variant='h6' style={{flex: '1'}}>
                    <FormattedMessage id={props.title}/>
                </Typography>
                {
                    props.buttons &&
                    props.buttons.map((btn, i) => {
                        return (
                            <EnhancedButtonLink key={i} to={btn.to} title={btn.title}/>
                        )
                    })
                }
                <Button variant='contained' color='primary' style={{marginLeft: theme.spacing(1)}} onClick={handleRefreshClick}>
                    <RefreshIcon/>
                </Button>
            </Box>
            <EnhancedTable
                columns={props.columns}
                data={data}
                fullHeight
                loading={loading}
            />
        </Box>
    );
}
 
export default EnhancedListPage;