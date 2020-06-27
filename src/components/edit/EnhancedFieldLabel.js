import React from 'react';
import { InputBase } from '@material-ui/core';
import TextMaskCNPJ from '../fields/TextMaskCNPJ';

const EnhancedFieldLabel = (props) => {
    return (
        <InputBase
            value={props.value}
            readOnly
            inputComponent={
                props.mask === 'cnpj' ? TextMaskCNPJ :
                null
            }
        />
    );
}
 
export default EnhancedFieldLabel;