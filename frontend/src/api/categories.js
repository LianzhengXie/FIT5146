import { API_URL, getOptions } from '../constants';

export const getCategories = () => {
    return fetch(`${API_URL}/category`, getOptions())
        .then(res => res.json())
}