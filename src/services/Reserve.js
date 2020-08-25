
const apiUrl = `${process.env.REACT_APP_API_URL}/reserve`; 

export const add = (reserveData) => {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(reserveData),
    };

    return fetch(`${apiUrl}/add`, requestOptions)
        .then(handleResponse)
}

export const detailedByCustomer = (customer) => {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
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