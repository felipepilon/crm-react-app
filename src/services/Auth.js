
const apiUrl = `${process.env.REACT_APP_API_URL}/auth`; 

export const user = (user) => {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
        },
    }

    return fetch(`${apiUrl}/user?email=${user.email}`, requestOptions)
        .then(handleResponse)
}

export const authUser = () => {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
        headers: { 
            'Content-Type': 'application/json',
        },
    }

    return fetch(`${apiUrl}/authUser`, requestOptions)
        .then(handleResponse)
}

export const signIn = (user, password) => {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email, password }),
    };

    return fetch(`${apiUrl}/signIn`, requestOptions)
        .then(handleResponse)
}

export const signOut = (user, password) => {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 
            'Content-Type': 'application/json',
        },
    };

    return fetch(`${apiUrl}/signOut`, requestOptions)
        .then(handleResponse)
}

const handleResponse = ( response ) => {
    return response.text()
    .then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            return Promise.reject(data)
        }

        return data;
    });
}