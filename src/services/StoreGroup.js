
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_StoreGroups = (params) => {
    return api.get('/storeGroup/storeGroups', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_StoreGroup = (params) => {
    return api.get('/storeGroup/storeGroup', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const post_StoreGroup = (params) => {
    return api.post('/storeGroup/storeGroup', params)
    .then(handleResponse)
    .catch(handleError);
}