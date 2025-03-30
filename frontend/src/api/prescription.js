import { API_URL, deleteOptions, getOptions, postOptions, reqOptions } from '../constants';

export const getPrescriptionsForVisit = async (visit_id) => {
    return fetch(`${API_URL}/prescription?visit_id=${visit_id}`, getOptions())
        .then(res => res.json())
}
export const getPrescriptionHistory = async (visit_id) => {
    return fetch(`${API_URL}/prescription/history?visit_id=${visit_id}`, getOptions())
        .then(res => res.json())
}
export const getPrescriptionsForPatient = async (patient_id) => {
    return fetch(`${API_URL}/prescription/all?patient_id=${patient_id}`, getOptions())
        .then(res => res.json())
}

export const insertNewPrescriptions = async (body) => {
    return fetch(`${API_URL}/prescription`, postOptions(body))
        .then(res => res.json())
}

export const addPrescription = async (body) => {
    const response = await fetch(`${API_URL}/prescription`, postOptions(body))
    if (!response.ok) throw new Error(response.statusText)
    return response.json()
}
export const deletePrescription = async (body) => {
    const response = await fetch(`${API_URL}/prescription`, deleteOptions(body))
    if (!response.ok) throw new Error(response.statusText)
    return response.json()
}
export const updatePrescription = async (body) => {
    const response = await fetch(`${API_URL}/prescription`, reqOptions(body, 'PUT'))
    if (!response.ok) throw new Error(response.statusText)
    return response.json()
}
