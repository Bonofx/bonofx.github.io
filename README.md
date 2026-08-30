# DisciplineOS — Landing (Generated)

This repository hosts a single-page landing site for DisciplineOS and is published via GitHub Pages at: https://bonofx.github.io

What's included
- index.html — responsive single-page landing
- styles.css — branding and layout
- assets/logo.svg — generated logo
- assets/phone-mockup.svg — simple phone mockup showing streaks
- script.js — placeholder signup behavior (stores emails in localStorage)
- LICENSE — MIT

Payment & activating Pro
If a person wants to sign up and pay manually (EFT), use the following instructions which are shown on the site and will be included in emails/messages:

- Account number: 1309243832
- After payment, WhatsApp or call: 065 391 8848 and send your name and the email you used to sign up. We'll activate Pro access within 24 hours.

Security note: This repo contains only the instructions for manual EFT payments. Do not store sensitive credentials or bank PINs here. If you'd like, I can integrate an automated payment flow (Stripe, PayFast, Yoco) so payments route to your account programmatically — tell me which provider you prefer and I'll scaffold a serverless integration.

How to preview locally
1. Serve the folder with a static server (e.g., `npx http-server` or `python -m http.server`)
2. Open http://localhost:8080 (or http://localhost:8000)

Next steps (recommended)
- Replace placeholder signup with a real capture endpoint (Formspree, Netlify Forms, Supabase, or your backend). The current form only stores leads to localStorage as a placeholder.
- Integrate payments and charity payout flow for failed commitments. I can help with Stripe or South African providers.
- Replace the placeholder logo with designer exports (SVG/PNG at multiple sizes) or iterate the SVG.
- Connect a custom domain if you have one.

If you want edits to copy, colors, or the logo, tell me what to change and I'll update the repo and redeploy.
