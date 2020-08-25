
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_Stores = (filters) => {
    return api.post('/store/stores', filters)
    .then(handleResponse)
    .catch(handleError);
}

export const get_Store = (store_id) => {
    return api.get('/store', {
        params: {
            store_id
        }
    })
    .then(handleResponse)
    .catch(handleError);
}

export const post_Store = (store) => {
    return api.post('/store/update', store)
    .then(handleResponse)
    .catch(handleError);
}