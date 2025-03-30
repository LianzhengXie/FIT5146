import { API_URL, deleteOptions, postOptions } from '../constants';

export const insertReminder = async (body) => {
    // body = {patient_id : '...', start_date: '...', end_date: '...', frequency_days: '...'}
    return fetch(`${API_URL}/reminder`, postOptions(body))
        .then(res => res.json())
}

export const deleteReminderForPatient = async (body) => {
    // body = {patient_id : '...'}
    const response = await fetch(`${API_URL}/reminder`, deleteOptions(body))
    return response.json()
}
