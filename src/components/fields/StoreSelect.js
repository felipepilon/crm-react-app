import React, { useEffect, useState, Fragment } from 'react';
import { Select, MenuItem, InputLabel } from '@material-ui/core';
import { stores as getStoresApi } from '../../services/Store';
import { FormattedMessage } from 'react-intl';

const StoreSelect = (props) => {
    const [ stores, setStores ] = useState([]);

    useEffect(() => {
        getStoresApi()
        .then(result => setStores(result));
    }, []);

    useEffect(() => {
        props.setStore(stores.length === 1 ? stores[0] : {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stores]);

    const handleChange = (e) => {
        props.setSalesman(e.target.value ? stores.find((sto => sto.store_id === e.target.value)) : {})
    }

    const value = props.store.store_id || '';

    return (
        <Fragment>
            <InputLabel shrink id='store-select-label'><FormattedMessage id='Store'/></InputLabel>
            <Select
                labelId='store-select-label'
                displayEmpty
                fullWidth
                value={value}
                onChange={handleChange}
            >
                {
                    stores.length !== 1 ?
                    <MenuItem value=''>
                        <em><FormattedMessage id='Select'/></em>
                    </MenuItem> :
                    null
                }
                {
                    stores.map((sto, i) => {
                        return (
                            <MenuItem key={i}
                                value={sto.store_id}
                            >
                                {sto.name}
                            </MenuItem>
                        )
                    })
                }
            </Select>
        </Fragment>
    );
}
 
export default StoreSelect;