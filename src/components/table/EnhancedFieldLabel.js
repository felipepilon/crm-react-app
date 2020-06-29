import React from 'react';
import LabelMasks from '../../utils/LabelMasks'

const EnhancedFieldLabel = (props) => {
    let { value } = props;

    if (props.mask)
        value = LabelMasks[props.mask](value);

    return (
        <label>{value}</label>
    );
}
 
export default EnhancedFieldLabel;