
const apiUrl = `${process.env.REACT_APP_API_URL}/store`; 

export const stores = (filters) => {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
    };

    return fetch(`${apiUrl}/stores`, requestOptions)
        .then(handleResponse)
}

export const store = (storeId) => {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
        headers: { 
            'Content-Type': 'application/json',
        },
    };

    return fetch(`${apiUrl}/store?storeId=${storeId}`, requestOptions)
        .then(handleResponse)
}

export const update = (store) => {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(store),
    };

    return fetch(`${apiUrl}/update`, requestOptions)
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