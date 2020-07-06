import React from 'react';
import LabelMasks from '../../utils/LabelMasks'
import { useIntl } from 'react-intl';

const EnhancedFieldLabel = (props) => {
    let { value } = props;

    const int = useIntl();
    
    if (props.mask === 'date') {
        value = int.formatDate(value);
    }
    else if (props.mask) {
        value = LabelMasks[props.mask](value);
    }

    return (
        <label>{value}</label>
    );
}
 
export default EnhancedFieldLabel;