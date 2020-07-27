
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