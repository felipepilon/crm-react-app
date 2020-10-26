
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const get_ContactMsgPresets = (params) => {
    return api.get('/contactMsgPresets', {params})
    .then(handleResponse)
    .catch(handleError);
}

export const get_ContactMsgPreset = ({contact_msg_preset_id}) => {
    return api.get(`/contactMsgPresets/${contact_msg_preset_id}`)
    .then(handleResponse)
    .catch(handleError);
}

export const post_ContactMsgPreset = (params) => {
    return api.post('/contactMsgPresets', params)
    .then(handleResponse)
    .catch(handleError);
}