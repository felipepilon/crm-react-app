
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const post_Customer = (params) => {
    return api.post('/customers', params)
    .then(handleResponse)
    .catch(handleError);
}

export const get_Customers = (params) => {
    return api.get('/customers', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_CustomersIndex = (params) => {
    return api.get('/customers/index', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_Customer = ({customer_id}) => {
    return api.get(`/customers/${customer_id}`)
    .then(handleResponse)
    .catch(handleError);
}