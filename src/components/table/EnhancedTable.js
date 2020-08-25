import React, { Fragment, useState, useEffect } from 'react';
import { Box, FormControlLabel, Switch, Table, Typography, CircularProgress } from '@material-ui/core';
import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableBody from './EnhancedTableBody';
import { useIntl, FormattedMessage } from 'react-intl';

const EnhancedTable = (props) => {
    const { data, columns, dataStatus } = props;

    const [dense, setDense] = useState(props.dense || 'normal');
    const [tableData, setTableData] = useState([]);
    const [tableColumns, setTableColumns] = useState([]);
    // eslint-disable-next-line no-unused-vars

    const intl = useIntl();
    
    const handleChangeDense = () => {
        setDense(dense === 'normal' ? 'dense' : 'normal');
    };

    useEffect(() =>
    {
        const tc = columns.map((col) => {
            const title = col.title ? intl.formatMessage({id: col.title}) : '';
            
            return {
                ...{ title },
                ...col,
            }
        });

        setTableColumns(tc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [columns]);

    useEffect(() =>
    {
        const td = data.map((row, _i) => {
            return {
                ...{ _i },
                ...row,
            }
        })

        setTableData(td);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const denseSwitchEnabled = !dense || !dense.includes('Disabled') ? true : false;

    const showDataNotFound = dataStatus === 'loaded' && !tableData.length;

    return (
        <Box
            display='flex'
            width='100%'
            height={props.fullHeight ? '100%' : null}
            flexDirection='column'
            minHeight='0'
        >
            {
                showDataNotFound ? 
                <Typography variant='body2'><FormattedMessage id='No records found'/></Typography> :
                null
            }
            <Box
                overflow='auto'
                flex='1'
            >
                <Table
                    size={dense.includes('dense') ? 'small' : 'medium'}
                    stickyHeader
                >
                    <EnhancedTableHead
                        columns={tableColumns}
                        colapsableColumn={props.colapsableColumns ? true : false}
                    />
                    {
                        dataStatus === 'loaded' ?
                        <EnhancedTableBody
                            columns={tableColumns}
                            data={tableData}
                            dense={dense}
                            handleCellClick={props.handleCellClick}
                            colapsableColumns={props.colapsableColumns}
                            loadColapsableData={props.loadColapsableData}
                        /> : 
                        null
                    }
                </Table>
                {
                    dataStatus !== 'loaded' ?
                    <Box padding={2}>
                        <CircularProgress size={20}/>
                    </Box> : 
                    null
                }
            </Box>
            {
                denseSwitchEnabled ?
                <Box
                    padding={dense.includes('dense') ? 0 : 2}
                >
                    <FormControlLabel
                        control={<Switch checked={dense.includes('dense')} onChange={handleChangeDense} />}
                        label={intl.formatMessage({id: 'Dense Padding'})}
                    />
                </Box> : null
            }
        </Box>
    );
}
 
export default EnhancedTable;