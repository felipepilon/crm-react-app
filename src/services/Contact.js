
const apiUrl = `${process.env.REACT_APP_API_URL}/contact`; 

export const add = (data) => {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    return fetch(`${apiUrl}/add`, requestOptions)
        .then(handleResponse)
}

export const addInteractions = (data) => {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    return fetch(`${apiUrl}/addInteractions`, requestOptions)
        .then(handleResponse)
}

export const update = (data) => {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    return fetch(`${apiUrl}/update`, requestOptions)
        .then(handleResponse)
}

export const list = (filters) => {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
    };

    return fetch(`${apiUrl}/list`, requestOptions)
        .then(handleResponse)
}

export const msgPreset = (contact) => {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
        headers: { 
            'Content-Type': 'application/json',
        },
    };

    return fetch(`${apiUrl}/msgPreset?contact_via=${contact.contact_via}&contact_reason=${contact.contact_reason}`, requestOptions)
        .then(handleResponse)
}

export const listInteractions = (contact) => {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
        headers: { 
            'Content-Type': 'application/json',
        },
    };

    return fetch(`${apiUrl}/listInteractions?contact_id=${contact.contact_id}`, requestOptions)
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