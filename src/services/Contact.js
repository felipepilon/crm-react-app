import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';
const apiUrl = `${process.env.REACT_APP_API_URL}/contact`; 

export const post_ContactNew = (data) => {
    return api.post('/contact/add', data)
    .then(handleResponse)
    .catch(handleError);
}

export const post_Interactions = (data) => {
    return api.post('/contact/addInteractions', data)
    .then(handleResponse)
    .catch(handleError);
}

export const post_ContactUpdate = (data) => {
    return api.post('/contact/update', data)
    .then(handleResponse)
    .catch(handleError);
}

export const get_Contacts = (filters) => {
    return api.post('/contact/list', filters)
    .then(handleResponse)
    .catch(handleError);
}

export const get_MsgPreset = (contact_via, contact_reason) => {
    return api.get('/contact/list', {
        params: {
            contact_via,
            contact_reason,
        }
    })
    .then(handleResponse)
    .catch(handleError);
}

export const get_Interactions = (contact_id) => {
    return api.get('/contact/list', {
        params: {
            contact_id
        }
    })
    .then(handleResponse)
    .catch(handleError);
}