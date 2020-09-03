
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_Stores = (params) => {
    return api.get('/stores', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_Store = ({store_id}) => {
    return api.get(`/stores/${store_id}`)
    .then(handleResponse)
    .catch(handleError);
}

export const post_Store = (params) => {
    return api.post('/stores', params)
    .then(handleResponse)
    .catch(handleError);
}