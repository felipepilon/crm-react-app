import { 
    cleanRefreshToken, 
    setRefreshToken,
    setAccessToken,
    cleanAccessToken
} from '../utils/TokenStorage';
import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

const apiUrl = `${process.env.REACT_APP_API_URL}/auth`;

export const get_User = (user) => {
    return api.get('/auth/user', {
        params: {
            email: user.email,
        }
    })
    .then(handleResponse)
    .catch(handleError);
}

export const get_AuthUser = () => {
    return api.get('/auth/authUser')
    .then(handleResponse)
    .catch(handleError);
}

export const post_SignIn = (user) => {
    return api.post('/auth/signIn', user)
    .then((res) => {
        if (res.data && res.data.refresh_token)
            setRefreshToken(res.data.refresh_token);

        if (res.data && res.data.access_token)
            setAccessToken(res.data.access_token);

        return res.data;
    })
    .catch(handleError);
}

export const post_SignOut = () => {
    cleanRefreshToken();
    cleanAccessToken();
}