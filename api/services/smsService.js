const twilio = require('twilio');

const accountsid = process.env.TWILIO_ACCOUNT_SID;
const authtoken = process.env.TWILIO_AUTH_TOKEN;
const mobile_number = process.env.TWILIO_MOBILE_NUMBER;

const client = new twilio(accountsid, authtoken);

const sendSms = async (message, to) => {
    // If to is empty, set to to_number
    if (!to) {
        to = '+61422388572';
    }
    const sms_message = await client.messages.create({
        body: message,
        to: to,
        from: mobile_number
    });
    return sms_message;
}

module.exports = {
    sendSms
}
