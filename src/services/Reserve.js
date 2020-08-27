
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const post_Reserve = (params) => {
    return api.post('/reserve/reserve', params)
    .then(handleResponse)
    .catch(handleError);
}

export const get_ReserveDetails = (params) => {
    return api.get('/reserve/details', {
        params
    })
    .then(handleResponse)
    .catch(handleError);
}