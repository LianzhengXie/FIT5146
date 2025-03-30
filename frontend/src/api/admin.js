import { API_URL, postOptions } from '../constants';

export const send_follow_up_sms = async (code) => {
    const body = { code };
    const response = await fetch(`${API_URL}/admin/follow-up`, postOptions(body));
    console.log(response);
    const jsonResponse = await response.json()
    console.log(jsonResponse);
    return jsonResponse;
}

export const send_questionnaire_sms = async (mobile_number) => {
    const body = { mobile_number };
    const response = await fetch(`${API_URL}/admin/fill-questionnaire`, postOptions(body));
    console.log(response);
    const jsonResponse = await response.json()
    console.log(jsonResponse);
    return jsonResponse;
}
