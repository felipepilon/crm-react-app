
var maskCnpj = [
    /\d/, /\d/, '.',
    /\d/, /\d/, /\d/, /\d/, '.',
    /\d/, /\d/, /\d/, /\d/, '/',
    /\d/, /\d/, /\d/, /\d/, /\d/, '-',
    /\d/, /\d/,
];

var maskPhoneHome = [
    '(', /\d/, /\d/, ')', ' ',
    /\d/, /\d/, /\d/, /\d/, ' ',
    /\d/, /\d/, /\d/, /\d/,
];

var maskPhoneMobile = [
    '(', /[1-9]/, /[1-9]/, ')', ' ',
    /[1-9]/, ' ',
    /\d/, /\d/, /\d/, /\d/, ' ',
    /\d/, /\d/, /\d/, /\d/,
];

const cnpj = (value) => maskCnpj;

const phone = (value) => value.length !== 10 ? maskPhoneMobile : maskPhoneHome;

export default {
    cnpj,
    phone,
}