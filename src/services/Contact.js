import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const post_ContactNew = (params) => {
    return api.post('/contact/contact', params)
    .then(handleResponse)
    .catch(handleError);
}

export const post_Interactions = (params) => {
    return api.post('/contact/interactions', params)
    .then(handleResponse)
    .catch(handleError);
}

export const post_ContactUpdate = (params) => {
    return api.post('/contact/update', params)
    .then(handleResponse)
    .catch(handleError);
}

export const get_Contacts = (params) => {
    return api.post('/contact/contacts', params)
    .then(handleResponse)
    .catch(handleError);
}

export const get_MsgPreset = (params) => {
    return api.get('/contact/msgPreset', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_Interactions = (params) => {
    return api.get('/contact/interactions', {params})
    .then(handleResponse)
    .catch(handleError);
}