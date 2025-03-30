import { API_URL, getOptions, postOptions } from '../constants';

export const getQuestionsMandatoryWithAnswers = async () => {
    return fetch(API_URL + '/question_mandatory/', getOptions())
        .then((response) => response.json())
}

export const insertAnswerToQuestionsMandatory = async (body) => {
    const response = await fetch(`${API_URL}/question_mandatory/`, postOptions(body))
    if (!response.ok) throw new Error(response.statusText)
    return response.json()
}
