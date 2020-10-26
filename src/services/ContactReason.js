
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_ContactReasons = (params) => {
    return api.get('/contactReasons', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_ContactReason = ({contact_reason_id}) => {
    return api.get(`/contactReasons/${contact_reason_id}`)
    .then(handleResponse)
    .catch(handleError);
}

export const post_ContactReason = (params) => {
    return api.post('/contactReasons', params)
    .then(handleResponse)
    .catch(handleError);
}