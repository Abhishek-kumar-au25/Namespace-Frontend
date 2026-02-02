# Namespace Server

This minimal Express server proxies requests from the frontend to OpenAI (or other services) so that API keys stay on the server and are never exposed to the browser.

## Quick start

1. Copy the example env file and add your secrets:

   cp .env.example .env
   # Edit .env and add OPENAI_API_KEY

2. Install and run:

   npm install
   npm run dev   # uses nodemon
   npm start     # run in production

3. API

POST /api/assistant
Body: { message: string } or { messages: [{role: "user", content: "..."}, ...] }

Response: { assistant: { role, content }, raw: <openai response> }

## Security notes
- Never put `OPENAI_API_KEY` in client-side code.
- Use your platform's secret manager (Vercel, Netlify, Heroku, AWS, Azure) for production keys.
- Adjust rate limits as needed.
