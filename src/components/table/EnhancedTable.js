import React, { Fragment, useState, useEffect } from 'react';
import { Box, FormControlLabel, Switch, Table } from '@material-ui/core';
import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableBody from './EnhancedTableBody';
import { useIntl } from 'react-intl';

const EnhancedTable = (props) => {
    const { data, columns } = props;

    const [dense, setDense] = useState(false);
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
        const tc = columns.map(col => {
            const title = col.title ? intl.formatMessage({id: col.title}) : '';
            
            return {
                ...{ title },
                ...col,
            }
        });
        
        setTableColumns(tc)
        setTableData(data);
        setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, columns]);

    return (
        <Fragment>
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
            <Box
                padding={dense ? 0 : 2}
            >
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                    label="Dense padding"
                />
            </Box>
        </Fragment>
    );
}
 
export default EnhancedTable;