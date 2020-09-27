
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const post_Customer = (params) => {
    return api.post('/customers', params)
    .then(handleResponse)
    .catch(handleError);
}

export const get_Customers = (params) => {
    return api.post('/customers', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_CustomersIndex = (params) => {
    return api.get('/customers/index', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_Customer = (params) => {
    return api.get('/customers/customer', {params})
    .then(handleResponse)
    .catch(handleError);
}