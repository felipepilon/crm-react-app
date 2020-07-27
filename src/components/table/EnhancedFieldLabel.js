import React from 'react';
import LabelMasks from '../../utils/LabelMasks'
import { useIntl } from 'react-intl';

const EnhancedFieldLabel = (props) => {
    let { value } = props;

    const intl = useIntl();
    
    if (value) {
        if (props.mask === 'date') {
            value = intl.formatDate(value);
        }
        if (props.mask === 'time') {
            console.log('value', value)
            value = intl.formatTime(value);
        }
        else if (props.mask === 'datetime') {
            value = `${intl.formatDate(value)} ${intl.formatTime(value)}`;
        }
        else if (props.mask) {
            value = LabelMasks[props.mask](value);
        } 
        else if (props.intl && typeof props.intl === 'boolean') {
            value = intl.formatMessage({id: `${value}`})
        }
        else if (props.intl && typeof props.intl === 'string') {
            value = intl.formatMessage({id: `${props.intl}.${value}`})
        }
        else if (props.intlSplit && typeof props.intlSplit === 'boolean') {
            const values = value.split(', ');

            if (values.length === 1) {
                value = intl.formatMessage({id: values[0]})
            } else {
                value = value.split(', ').reduce((c, v) => {
                    return `${c}${intl.formatMessage({id: `${v}`})}, `;
                }, '');
                value = value.slice(0, -2);
            }
        }
        else if (props.intlSplit && typeof props.intlSplit === 'string') {
            const values = value.split(', ');

            if (values.length === 1) {
                value = intl.formatMessage({id: `${props.intlSplit}.${values[0]}`})
            } else {
                value = value.split(', ').reduce((c, v) => {
                    return `${c}${intl.formatMessage({id: `${props.intlSplit}.${v}`})}, `;
                }, '');
                value = value.slice(0, -2);
            }
        }
    }

    return (
        <label>{value}</label>
    );
}
 
export default EnhancedFieldLabel;