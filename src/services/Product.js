
const apiUrl = `${process.env.REACT_APP_API_URL}/product`; 

export const products = (filters) => {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(filters),
    };

    return fetch(`${apiUrl}/products`, requestOptions)
        .then(handleResponse)
}

export const product = (product_id) => {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
    };

    return fetch(`${apiUrl}/product?product_id=${product_id}`, requestOptions)
        .then(handleResponse)
}

export const sizeGrid = (size_grid_id) => {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
    };

    return fetch(`${apiUrl}/sizeGrid?size_grid_id=${size_grid_id}`, requestOptions)
        .then(handleResponse)
}

export const colors = (product_id) => {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
    };

    return fetch(`${apiUrl}/colors?product_id=${product_id}`, requestOptions)
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