import { API_URL, getOptions } from '../constants';

export const getPatientsLatest = ( page = 1, limit = 5) => {
    return fetch(`${API_URL}/patient/latest?page=${page}&limit=${limit}`, getOptions())
        .then(res => res.json())
}