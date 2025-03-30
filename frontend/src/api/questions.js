import { API_URL, getOptions, postOptions } from '../constants';

export const getQuestionsForCategory = (category_id) => {
    return fetch(API_URL + '/category/' + category_id + '/questions', getOptions())
        .then((response) => response.json())
}

export const getQuestionsAnsweredForVisit = (visit_id) => {
    return fetch(API_URL + `/answer/questions?visit_id=${visit_id}`, getOptions())
        .then((response) => response.json())
}

export const getQuestionsPerCategory = () => {
    return fetch(API_URL + `/category/questions`, getOptions())
        .then((response) => response.json())
}


// ANSWERS
export const getAsnwersForCategory = (category_id) => {
    return fetch(API_URL + '/answer?category_id=' + category_id, getOptions())
        .then((response) => response.json())
}

// listOfCategoryObj: e.g. [{"id": 1, "name": "Food"}, ...]
export const getCategoriesAnswered = () => {
    return fetch(API_URL + '/answer/categories', getOptions())
        .then((response) => response.json())
}

export const upsertAnswer = async (body) => {
    const response = await fetch(`${API_URL}/answer`, postOptions(body))
    if (!response.ok) throw new Error(response.statusText)
    return response.json()
}