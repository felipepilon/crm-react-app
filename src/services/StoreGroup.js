
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_StoreGroups = (params) => {
    return api.get('/storeGroups', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_StoreGroup = ({store_group_id}) => {
    return api.get(`/storeGroups/${store_group_id}`)
    .then(handleResponse)
    .catch(handleError);
}

export const post_StoreGroup = (params) => {
    return api.post('/storeGroups', params)
    .then(handleResponse)
    .catch(handleError);
}