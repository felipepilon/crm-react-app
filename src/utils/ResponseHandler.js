import { post_SignOut } from '../services/Auth';

const handleResponse = (res) => {
    return res.data;
};

const handleError = (err) => {
    console.error('handleError')
    console.error(err);
    return Promise.reject(err);
};

export {
    handleResponse,
    handleError,
}