
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_UserStores = (params) => {
    return api.get('/UserStore/UserStores', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_UserStore = (params) => {
    return api.get('/UserStore/UserStore', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const post_UserStore = (params) => {
    return api.post('/UserStore/UserStore', params)
    .then(handleResponse)
    .catch(handleError);
}