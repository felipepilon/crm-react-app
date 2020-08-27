
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_Users = (params) => {
    return api.get('/user/users', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_User = (params) => {
    return api.get('/user/user', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const post_User = (params) => {
    return api.post('/user/user', params)
    .then(handleResponse)
    .catch(handleError);
}