const express = require('express');
const axios = require('axios');
const createRateLimiter = require('../middleware/rateLimiter');

const router = express.Router();

// Protect the assistant endpoint with a rate limiter
router.use(createRateLimiter({ windowMs: 60 * 1000, max: 30 }));

// Basic POST /api/assistant
// Body: { message: string } OR { messages: [{role, content}, ...] }
router.post('/', async (req, res) => {
  try {
    const { message, messages } = req.body;

    if (!message && !messages) {
      return res.status(400).json({ error: 'Missing message or messages in request body.' });
    }

    let chatMessages;

    if (Array.isArray(messages)) {
      chatMessages = messages;
    } else {
      if (typeof message !== 'string' || message.trim().length === 0) {
        return res.status(400).json({ error: 'Invalid message' });
      }

      if (message.length > 5000) {
        return res.status(400).json({ error: 'Message too long' });
      }

      chatMessages = [{ role: 'user', content: message }];
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

    if (!OPENAI_API_KEY) {
      return res.status(500).json({ error: 'Server is not configured with an OpenAI API key.' });
    }

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model,
        messages: chatMessages,
        max_tokens: 1200,
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 30_000,
      }
    );

    const assistantMsg = response.data?.choices?.[0]?.message || null;

    return res.json({ assistant: assistantMsg, raw: response.data });
  } catch (err) {
    console.error('Assistant error:', err?.response?.data || err.message || err);
    const status = err?.response?.status || 500;
    const data = err?.response?.data || { error: 'Assistant error' };
    return res.status(status).json(data);
  }
});

module.exports = router;