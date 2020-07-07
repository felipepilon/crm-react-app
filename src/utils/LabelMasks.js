import StringMask from 'string-mask'

var maskCnpj = new StringMask('00.000.000/0000-00');
var maskCpf = new StringMask('000.000.000-000');
var maskPhoneHome = new StringMask('(00) 0000 0000');
var maskPhoneMobile = new StringMask('(00) 9 0000 0000');
var zipMask = new StringMask('00000-000');

const cnpj = (value) => maskCnpj.apply(value);

const cpf = (value) => maskCpf.apply(value);

const zip = (value) => zipMask.apply(value);

const phone = (value) => value ? (value.length > 10 ? maskPhoneMobile.apply(value) : maskPhoneHome.apply(value)) : '';

export default {
    cnpj,
    cpf,
    phone,
    zip,
}