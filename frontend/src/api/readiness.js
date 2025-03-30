import { API_URL, getOptions, postOptions } from '../constants';

export const getReadinessOptions = async () => {
    return fetch(`${API_URL}/readiness`, getOptions())
        .then(res => res.json())
}

export const getReadinessAnswers = async () => {
    return fetch(`${API_URL}/readiness/answer`, getOptions())
        .then(res => res.json())
}

export const upsertReadinessAnswer = async (body) => {
    return fetch(`${API_URL}/readiness/answer`, postOptions(body))
        .then(res => res.json())
}
