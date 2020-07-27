import React, { useEffect, useState } from 'react';
import { Select, MenuItem, InputLabel, FormControl, useTheme } from '@material-ui/core';
import { stores as getStoresApi } from '../../services/Store';
import { FormattedMessage } from 'react-intl';

const StoreSelect = (props) => {
    const [ options, setOptions ] = useState([]);
    const value = props.store_id;

    const theme = useTheme();

    useEffect(() => {
        getStoresApi()
        .then(result => {
            setOptions(result.map((opt) => {
                return {
                    id: opt.store_id,
                    label: opt.name,
                }
            }).sort((a, b) => a.label < b.label))
        });
    }, []);

    useEffect(() => {
        props.handleStoreIdChange(options.length === 1 ? options[0].id : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options]);

    return (
        <FormControl style={{marginTop: theme.spacing(2)}}>
            <InputLabel  id='store-select-label'><FormattedMessage id='Store'/></InputLabel>
            <Select
                labelId='store-select-label'
                id="demo-simple-select-outlined"
                value={value || ''}
                onChange={(e) => props.handleStoreIdChange(e.target ? e.target.value : '')}
                disabled={props.disabled}
            >
                {
                    options.length !== 1 ?
                    <MenuItem value=''>
                        <em><FormattedMessage id='Select'/></em>
                    </MenuItem> :
                    null
                }
                {
                    options.map((opt) => {
                        return (
                            <MenuItem key={opt.id}
                                value={opt.id}
                            >
                                {opt.label}
                            </MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
    );
}
 
export default StoreSelect;