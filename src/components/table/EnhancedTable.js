import React, { useState, useEffect } from 'react';
import { Box, FormControlLabel, Switch, Table, Typography, CircularProgress, TablePagination } from '@material-ui/core';
import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableBody from './EnhancedTableBody';
import { useIntl, FormattedMessage } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';
import { useLastLocation } from 'react-router-last-location';

const EnhancedTable = (props) => {
    const intl = useIntl();
    const hist = useHistory();
    const loc = useLocation();
    const lastLoc = useLastLocation();

    const restoreState = loc.state && lastLoc && lastLoc.pathname !== loc.pathname ? true : false;

    const [dense, setDense] = useState((restoreState && loc.state.dense) || props.dense || 'normal');
    const [rowsPerPage, setRowsPerPage] = useState((restoreState && loc.state.rowsPerPage) || props.rowsPerPage || 10);
    const [page, setPage] = useState((restoreState && loc.state.page) || props.page || 0);
    const [tableData, setTableData] = useState([]);
    const [tableColumns, setTableColumns] = useState([]);
    
    const handleChangeDense = () => {
        setDense(dense === 'normal' ? 'dense' : 'normal');
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() =>
    {
        const tc = props.columns.map((col) => {
            const title = col.title ? intl.formatMessage({id: col.title}) : '';
            
            return {
                ...{ title },
                ...col,
            }
        });

        setTableColumns(tc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.columns]);

    useEffect(() =>
    {
        let td = []
        if (props.data) {
            td = props.data.map((row, _i) => {
                return {
                    ...{ _i },
                    ...row,
                }
            })
        }

        setTableData(td);
        setPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.data]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => hist.replace(loc.pathname, { ...loc.state, ...{dense} }), [dense]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => hist.replace(loc.pathname, { ...loc.state, ...{rowsPerPage} }), [rowsPerPage]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => hist.replace(loc.pathname, { ...loc.state, ...{page} }), [page]);

    const denseSwitchVisible = !dense || !dense.includes('disabled') ? true : false;

    const showDataNotFound = !props.loading && !tableData.length;

    const paginationVisible = !props.paginationInvisible

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
                        !props.loading ?
                        <EnhancedTableBody
                            columns={tableColumns}
                            data={tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                            dense={dense}
                            colapsableColumns={props.colapsableColumns}
                            loadColapsableData={props.loadColapsableData}
                        /> : 
                        null
                    }
                </Table>
                {
                    props.loading ?
                    <Box padding={2}>
                        <CircularProgress size={20}/>
                    </Box> : 
                    null
                }
            </Box>
            {
                paginationVisible ?
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    component='div'
                    count={tableData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                /> :
                null
            }
            {
                denseSwitchVisible ?
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