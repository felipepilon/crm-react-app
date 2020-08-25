
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const post_Customer = (customer) => {
    return api.post('/customer/update', customer)
    .then(handleResponse)
    .catch(handleError);
}

export const get_Customers = (filters) => {
    return api.post('/customer/customers', filters)
    .then(handleResponse)
    .catch(handleError);
}

export const get_CustomersIndex = (filters) => {
    return api.post('/customer/customersIndex', filters)
    .then(handleResponse)
    .catch(handleError);
}

export const get_Customer = (customer_id) => {
    return api.get('/customer/customer', {
        params: {
            customer_id
        }
    })
    .then(handleResponse)
    .catch(handleError);
}