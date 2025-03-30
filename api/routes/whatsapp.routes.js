const express = require('express');
const router = express.Router();
const { sendWhatsappMessage } = require('../services/whatsappService');

router.post('/send-whatsapp', async (req, res) => {
  const { number, message } = req.body;

  if (!number || !message) {
    return res.status(400).json({ message: 'Number and message required' });
  }

  try {
    const result = await sendWhatsappMessage({ to: number, message });
    res.status(200).json({ success: true, sid: result.sid });
  } catch (err) {
    console.error('[WhatsApp Send Error]', err.message);
    res.status(500).json({ message: 'Failed to send message', error: err.message });
  }
});

module.exports = router;
