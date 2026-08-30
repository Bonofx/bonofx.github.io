## WhatsApp automation & 'bono123' link — setup instructions

I updated the site to:
- Keep the account number visible (1309243832) on the Pricing/payment section.
- Change the WhatsApp link to a prefilled message that includes the code `bono123` so customers can easily send the expected payment confirmation message.
- Add a serverless endpoint (api/whatsapp.js) you can deploy to receive incoming WhatsApp messages from Twilio. The function replies automatically and forwards the incoming message to an ADMIN_WEBHOOK_URL if you set one.

What I added
- A clickable wa.me link that pre-fills a message including `bono123` (on the pricing and payment section).
- A `api/whatsapp.js` serverless handler (Node) that responds to incoming Twilio webhooks with an acknowledgement and optionally forwards the message to an admin webhook.

How to enable real automation (high-level)
1. Create a Twilio account and enable the WhatsApp sandbox or request access to WhatsApp Business API.
   - Twilio WhatsApp sandbox: https://www.twilio.com/console/sms/whatsapp/learn
2. Deploy the `api/whatsapp.js` function to a server that can receive POST webhooks (Vercel, Netlify Functions, or your own server). For example, deploy this repo to Vercel and the endpoint will be available at `https://<your-deployment>/api/whatsapp`.
3. In the Twilio console, configure the webhook for incoming messages to point to your deployed endpoint.
   - Messaging → WhatsApp sandbox or your phone number configuration → Incoming messages webhook: `https://<your-deployment>/api/whatsapp`
4. (Optional) Set `ADMIN_WEBHOOK_URL` in your deployment environment to an endpoint that will receive POST notifications about incoming WhatsApp messages (e.g., a Google Apps Script Web App, a Zapier webhook, or your admin dashboard). The serverless function will POST { from, message, numMedia, media } to that URL.

Reply template & 'bono123'
- The automated reply asks customers to include `bono123` as the reference and attach a screenshot. This ties into your manual verification flow and makes matching transactions easier.

Security & privacy notes
- The function contains no secrets by default. If you enable VERIFY_TWILIO, you'll need to provide TWILIO_AUTH_TOKEN so the function can validate requests.
- Do not commit Twilio auth tokens, API keys, or other secrets to the repo. Use environment variables in your deployment platform.

If you want, I can:
- Deploy the serverless function to Vercel for you and connect Twilio (I'll need temporary access to your Vercel account or you can provide an invite), or
- Show step-by-step how to configure Twilio sandbox, deploy to Vercel, and connect the webhook (I can do this with detailed commands and screenshots).

What I pushed
- Updated `index.html` with wa.me links that prefill `bono123` in the message and make the phone number clickable.
- `api/whatsapp.js` serverless handler.
- Updated `README.md` with instructions on using Twilio and the webhook.

Next step — pick one:
- I deploy the webhook to Vercel for you (I’ll need a Vercel invite or login), and then you give Twilio the URL to wire the WhatsApp sandbox.
- I walk you through deploying it yourself and wiring Twilio (detailed step-by-step). If you want that, reply "Guide me".
- I wire a Zapier or Make flow instead (no code) to capture WhatsApp messages via Twilio and add them to a Google Sheet.

Which do you want me to do next?"