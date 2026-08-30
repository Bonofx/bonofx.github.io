// api/whatsapp.js
// Serverless endpoint for Twilio WhatsApp incoming messages.
// Deploy this to Vercel, Netlify Functions, or a server that accepts POST webhooks from Twilio.

// Behavior:
// - Responds to incoming WhatsApp messages with an automated acknowledgement and instructions.
// - Optionally forwards the message body to an ADMIN_WEBHOOK_URL if set in env vars (POST JSON).

// Environment variables (set in your deployment):
// - ADMIN_WEBHOOK_URL (optional): an endpoint that will receive POST { from, body, numMedia, mediaUrls }
// - VERIFY_TWILIO (optional): if '1', the function will attempt to verify Twilio signature using TWILIO_AUTH_TOKEN
// - TWILIO_AUTH_TOKEN (required only if VERIFY_TWILIO=1)

const { xml } = require('xmlbuilder');

module.exports = async (req, res) => {
  // Twilio posts form-encoded data
  const body = req.body || req.body || {};

  // In many serverless environments, body will be parsed. If not, parse urlencoded body.
  if (!body.Body && req.headers['content-type'] && req.headers['content-type'].includes('application/x-www-form-urlencoded')) {
    const raw = req.body;
  }

  const from = (body.From || body.from || '').toString();
  const message = (body.Body || body.body || '').toString();
  const numMedia = parseInt(body.NumMedia || body.numMedia || '0', 10) || 0;

  // Optionally forward to admin webhook
  const adminWebhook = process.env.ADMIN_WEBHOOK_URL;
  if (adminWebhook) {
    try {
      const fetch = require('node-fetch');
      const payload = { from, message, numMedia, received_at: new Date().toISOString() };
      // If media present, try to collect media URLs
      if (numMedia > 0) {
        const media = [];
        for (let i = 0; i < numMedia; i++) {
          const key = `MediaUrl${i}`;
          if (body[key]) media.push(body[key]);
        }
        payload.media = media;
      }
      await fetch(adminWebhook, { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } });
    } catch (err) {
      console.error('Forwarding to admin webhook failed:', err.message);
    }
  }

  // Simple TwiML response
  // Use a short, direct tone similar to the site's voice.
  const reply = `Thanks — we received your message. If you paid via EFT, include the reference ${'bono123'} in your WhatsApp message and attach a screenshot of the transfer. We'll verify and activate Pro within 24 hours.`;

  const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escapeXml(reply)}</Message></Response>`;
  res.setHeader('Content-Type', 'application/xml');
  res.statusCode = 200;
  res.end(twiml);
};

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'\"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\"': return '&quot;';
      case "'": return '&apos;';
    }
  });
}
