import React, { Fragment, useState, useEffect } from 'react';
import { Box, FormControlLabel, Switch, Table, Typography } from '@material-ui/core';
import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableBody from './EnhancedTableBody';
import { useIntl, FormattedMessage } from 'react-intl';

const EnhancedTable = (props) => {
    const { data, columns, dataStatus } = props;

    const [dense, setDense] = useState(!props.denseMode ? false :
        props.denseMode === 'normal' ? false :
        props.denseMode === 'dense' ? true :
        props.denseMode === 'denseNormal' ? false :
        props.denseMode === 'denseDisabled' ? true :
        false
    );
    const [tableData, setTableData] = useState([]);
    const [tableColumns, setTableColumns] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(true);

    const intl = useIntl();
    
    const handleChangeDense = () => {
        setDense(!dense)
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

        const td = data.map((row, _i) => {
            return {
                ...{ _i },
                ...row,
            }
        })
        
        setTableColumns(tc)
        setTableData(td);
        setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, columns]);

    const denseSwitchEnabled = !props.dense || !props.dense.includes('Disabled') ? true : false;

    const showDataNotFound = dataStatus === 'loaded' && !tableData.length;

    return (
        <Fragment>
            <Box
                display='flex'
                width='100%'
                height={props.fullHeight ? '100%' : null}
                flexDirection='column'
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
                        size={dense ? 'small' : 'medium'}
                        stickyHeader
                        
                    >
                        <EnhancedTableHead
                            columns={tableColumns}
                        />
                        <EnhancedTableBody
                            columns={tableColumns}
                            data={tableData}
                            handleCellClick={props.handleCellClick}
                        />
                    </Table>
                </Box>
                {
                    denseSwitchEnabled ?
                    <Box
                        padding={dense ? 0 : 2}
                    >
                        <FormControlLabel
                            control={<Switch checked={dense} onChange={handleChangeDense} />}
                            label="Dense padding"
                        />
                    </Box> : null
                }
            </Box>
        </Fragment>
    );
}
 
export default EnhancedTable;