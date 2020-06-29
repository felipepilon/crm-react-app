import StringMask from 'string-mask'

var maskCnpj = new StringMask('00.000.000/0000-00');
var maskPhoneHome = new StringMask('(00) 0000 0000');
var maskPhoneMobile = new StringMask('(00) 9 0000 0000');

const cnpj = (value) => maskCnpj.apply(value);

const phone = (value) => value.length > 10 ? maskPhoneMobile.apply(value) : maskPhoneHome.apply(value);

export default {
    cnpj,
    phone,
}