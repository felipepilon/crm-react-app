import { handleResponse, handleError } from '../utils/ResponseHandler';
import api from './API';

export const products = (params) => {
    return api.post('/product/products', params)
    .then(handleResponse)
    .catch(handleError);
}

export const product = (product_id) => {
    return api.get('/product/product', {params: {product_id}})
    .then(handleResponse)
    .catch(handleError);
}

export const sizeGrid = (size_grid_id) => {
    return api.get('/product/sizeGrid', {params: {size_grid_id}})
    .then(handleResponse)
    .catch(handleError);
}

export const colors = (product_id) => {
    return api.get('/product/colors', {params: {product_id}})
    .then(handleResponse)
    .catch(handleError);
}
