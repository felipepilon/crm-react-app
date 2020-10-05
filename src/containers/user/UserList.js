import React, { useEffect, useState } from 'react';
import ListPageHeaderWrapper from '../../components/list-page/ListPageHeaderWrapper';
import ListPageTitle from '../../components/list-page/ListPageTitle';
import ListPageWrapper from '../../components/list-page/ListPageWrapper';
import ListPageRefreshButton from '../../components/list-page/ListPageRefreshButton';
import ListPageButton from '../../components/list-page/ListPageButton';
import TableWrapper from '../../components/table2/TableWrapper';
import DataNotFoundLabel from '../../components/table2/DataNotFoundLabel';
import TableBodyWrapper from '../../components/table2/TableBodyWrapper';
import TableHeaderWrapper from '../../components/table2/TableHeaderWrapper';
import ColumnHeader from '../../components/table2/ColumnHeader';
import RowsWrapper from '../../components/table2/RowsWrapper';
import RowWrapper from '../../components/table2/RowWrapper';
import TableCell from '../../components/table2/TableCell';
import LoadingProgress from '../../components/table2/LoadingProgress';
import Pagination from '../../components/table2/Pagination';
import DenseSwitch from '../../components/table2/DenseSwitch';
import { get_Users } from '../../services/User';
import UserEditDialog from './UserEditDialog';
import UserAddDialog from './UserAddDialog';
import { useLocation } from 'react-router-dom';

const UserList = () => {
    const loc = useLocation();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState('normal');
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [currentRowId, setCurrentRowId] = useState(null);

    useEffect(() => {
        get_Users()
        .then((res) => {
            setData(res);
            setLoading(false);
        });
    }, []);

    const handleRefreshList = () => {
        setLoading(true);
        setData([]);

        get_Users()
        .then((res) => {
            setData(res);
            setLoading(false);
        });
    };

    const handleUserUpdated = () => {
        handleRefreshList();
    }

    const handleEditLinkClick = (selCustId) => {
        setCurrentRowId(selCustId);
        setOpenEdit(true);
    }

    const showDataNotFound = !loading && !data.length
    
    return (
        <ListPageWrapper>
            <ListPageHeaderWrapper>
                <ListPageTitle title='Users'/>
                <ListPageButton title='New User' handleClick={() => setOpenAdd(true)}/>
                <ListPageRefreshButton handleClick={handleRefreshList}/>
            </ListPageHeaderWrapper>
            <TableWrapper>
                <DataNotFoundLabel show={showDataNotFound}/>
                <LoadingProgress loading={loading}/>
                <TableBodyWrapper dense={dense}>
                    <TableHeaderWrapper>
                        <ColumnHeader title='Edit'/>
                        <ColumnHeader title='Name'/>
                        <ColumnHeader title='Email'/>
                        <ColumnHeader title='Role'/>
                        <ColumnHeader title='Store Groups'/>
                        <ColumnHeader title='Stores'/>
                    </TableHeaderWrapper>
                    <RowsWrapper>{
                        !loading &&
                        data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <RowWrapper key={row.user_id}>
                                    <TableCell format='editIcon' dense={dense} handleClick={() => handleEditLinkClick(row.user_id)}/>
                                    <TableCell value={row.name}/>
                                    <TableCell value={row.email}/>
                                    <TableCell value={row.role} format='intl'/>
                                    <TableCell value='Store Groups' format='intlLink' to={{
                                        pathname: `${loc.pathname}/${row.user_id}/storeGroups`,
                                        state: { from: loc }
                                    }}/>
                                    <TableCell value='Stores' format='intlLink' to={{
                                        pathname: `${loc.pathname}/${row.user_id}/stores`,
                                        state: { from: loc }
                                    }}/>
                                </RowWrapper>
                            )
                        })
                    }</RowsWrapper>
                </TableBodyWrapper>
                {
                    !loading &&
                    <Pagination
                        page={page}
                        rowsPerPage={rowsPerPage}
                        count={data.length}
                        setPage={setPage}
                        setRowsPerPage={setRowsPerPage}
                    />
                }
                <DenseSwitch dense={dense} setDense={setDense}/>
            </TableWrapper>
            {
                openEdit &&
                <UserEditDialog
                    user_id={currentRowId}
                    open={openEdit}
                    handleClose={() => setOpenEdit(false)}
                    handleUpdated={handleUserUpdated}
                />
            }
            {
                openAdd &&
                <UserAddDialog
                    open={openAdd}
                    handleClose={() => setOpenAdd(false)}
                    handleUpdated={handleUserUpdated}
                />
            }
        </ListPageWrapper>
    );
};

export default UserList;