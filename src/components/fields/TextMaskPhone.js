import React from 'react';
import MaskedInput from 'react-text-mask';

const maskHome = [
    '(', /\d/, /\d/, ')',
    ' ', /\d/, /\d/, /\d/, /\d/,
    ' ', /\d/, /\d/, /\d/, /\d/, 
];

const maskMobile = [
    '(', /\d/, /\d/, ')',
    ' ', /\d/,
    ' ', /\d/, /\d/, /\d/, /\d/,
    ' ', /\d/, /\d/, /\d/, /\d/, 
];

const TextMaskPhone = (props) => {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={value => value.replace(/(\D)+/g,'').length > 10 ? maskMobile : maskHome }
            inputMode='numeric'
        >
            { props.children }
        </MaskedInput>
    );
}

export default TextMaskPhone;