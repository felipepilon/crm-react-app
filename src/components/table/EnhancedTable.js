import React, { Fragment, useState, useEffect } from 'react';
import { Box, FormControlLabel, Switch, Table } from '@material-ui/core';
import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableBody from './EnhancedTableBody';
import { getObjectValue } from '../../utils/ObjectValueReader';
import { useIntl } from 'react-intl';

const EnhancedTable = (props) => {
    const { data, columns } = props;

    const [dense, setDense] = useState(false);
    const [columnSizes, setColumnSizes] = useState({});
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
        const cs = { ...columnSizes };

        const tc = columns.map(col => {
            const title = col.title ? intl.formatMessage({id: col.title}) : '';
            
            const width = title.length / 2;

            const colSize = cs[col.name] || {};

            if (!colSize.width || colSize.width < width)
            {
                colSize.width = width;
                cs[col.name] = colSize;
            }

            return {
                ...{ title },
                ...col,
            }
        });

        const td = data.map((row, i) => {
            columns.forEach(col => {
                const value = getObjectValue(row, col.name) || '';
                const width = value.length / 2;

                const colSize = cs[col.name] || {};

                if (!colSize.width || colSize.width < width)
                {
                    colSize.width = width;
                    cs[col.name] = colSize;
                }
            })

            return { 
                ...{_rowId: i},
                ...row,
            }
        });

        setColumnSizes(cs);
        setTableColumns(tc)
        setTableData(td);
        setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, columns]);

    return (
        <Fragment>
            <Box
                minHeight='0'
                overflow='auto'
                flex='1'
            >
                <Table
                    size={dense ? 'small' : 'medium'}
                    stickyHeader
                >
                    <EnhancedTableHead
                        columns={tableColumns}
                        columnSizes={columnSizes}
                    />
                    <EnhancedTableBody
                        columns={tableColumns}
                        data={tableData}
                        columnSizes={columnSizes}
                        setColumnSizes={setColumnSizes}
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