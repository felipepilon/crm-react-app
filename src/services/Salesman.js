
const apiUrl = `${process.env.REACT_APP_API_URL}/salesman`; 

export const salespeople = (filters) => {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
    };

    return fetch(`${apiUrl}/salespeople`, requestOptions)
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