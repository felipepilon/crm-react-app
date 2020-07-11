import React, { useEffect, useState, Fragment } from 'react';
import { Select, MenuItem, InputLabel } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { salespeople as getSalespeopleApi } from '../../services/Salesman';

const SalesmanSelect = (props) => {
    const [ salespeople, setSalespeople ] = useState([]);

    useEffect(() => {
        getSalespeopleApi({ store_id: props.store.store_id })
        .then((result) => {
            setSalespeople(result);
        })
    }, [props.store]);

    useEffect(() => {
        props.setSalesman(salespeople.length === 1 ? salespeople[0] : {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [salespeople]);

    const handleChange = (e) => {
        props.setSalesman(e.target.value ? salespeople.find((slp => slp.salesman_id === e.target.value)) : {})
    }

    const value = props.salesman.salesman_id || '';
    
    return (
        <Fragment>
            <InputLabel shrink id='salesma-select-label'><FormattedMessage id='Salesman'/></InputLabel>
            <Select
                labelId='salesma-select-label'
                displayEmpty
                fullWidth
                value={value}
                onChange={handleChange}
            >
                {
                    salespeople.length !== 1 ?
                    <MenuItem value=''>
                        <em><FormattedMessage id='Select'/></em>
                    </MenuItem> :
                    null
                }
                {
                    salespeople.map((slm, i) => {
                        return (
                            <MenuItem key={i}
                                value={slm.salesman_id}
                            >
                                {slm.name}
                            </MenuItem>
                        )
                    })
                }
            </Select>
        </Fragment>
    );
}
 
export default SalesmanSelect;