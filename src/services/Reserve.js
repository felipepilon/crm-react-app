
const apiUrl = `${process.env.REACT_APP_API_URL}/reserve`; 

export const add = (reserveData) => {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reserveData),
    };

    return fetch(`${apiUrl}/add`, requestOptions)
        .then(handleResponse)
}

export const detailedByCustomer = (customer) => {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
        headers: { 
            'Content-Type': 'application/json',
        },
    };

    return fetch(`${apiUrl}/detailedByCustomer?customer_id=${customer.customer_id}`, requestOptions)
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