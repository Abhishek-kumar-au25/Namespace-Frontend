const express = require('express');
const nodemailer = require('nodemailer');
const createRateLimiter = require('../middleware/rateLimiter');

const router = express.Router();

router.use(createRateLimiter({ windowMs: 5 * 60 * 1000, max: 10 }));

const getMailerConfig = () => {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT || 465);
  const secure =
    typeof process.env.SMTP_SECURE === 'string'
      ? process.env.SMTP_SECURE === 'true'
      : port === 465;

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  return { host, port, secure, user, pass };
};

router.post('/send', async (req, res) => {
  try {
    const { name, email, phone, message, website } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    const honeypot = typeof website === 'string' ? website.trim() : '';
    if (honeypot) {
      return res.status(400).json({ error: 'Unable to send message.' });
    }
    const { host, port, secure, user, pass } = getMailerConfig();
    if (!user || !pass) {
      return res.status(500).json({ error: 'SMTP credentials are not configured.' });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    const to = process.env.MAIL_TO || user;
    const from = process.env.MAIL_FROM || `Namespace Consultants <${user}>`;

    const subject = `New contact request from ${name}`;
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      `Message: ${message}`,
    ]
      .filter(Boolean)
      .join('\n');

    await transporter.sendMail({
      to,
      from,
      replyTo: email,
      subject,
      text,
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error('Contact send error:', err?.message || err);
    return res.status(500).json({ error: 'Failed to send message.' });
  }
});

module.exports = router;


