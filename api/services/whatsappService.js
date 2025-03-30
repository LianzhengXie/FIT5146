const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendWhatsappMessage = async ({ to, message }) => {
  return await client.messages.create({
    from: process.env.TWILIO_WHATSAPP_NUMBER,
    to: `whatsapp:${to}`,
    body: message,
  });
};

module.exports = { sendWhatsappMessage };
