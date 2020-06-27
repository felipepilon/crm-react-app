import React from 'react';
import MaskedInput from 'react-text-mask';

const mask = [
    /\d/, /\d/, '.',
    /\d/, /\d/, /\d/, '.', 
    /\d/, /\d/, /\d/, '/', 
    /\d/, /\d/, /\d/, /\d/,
    '-', /\d/, /\d/,
]

const TextMaskCNPJ = (props) => {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={mask}
            inputMode='numeric'
        >
            { props.children }
        </MaskedInput>
    );
}

export default TextMaskCNPJ;