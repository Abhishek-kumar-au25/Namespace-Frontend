const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const assistantRouter = require('./routes/assistant');
const contactRouter = require('./routes/contact');

dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000';

if (!process.env.OPENAI_API_KEY) {
  console.warn('⚠️  Warning: OPENAI_API_KEY is not set. The /api/assistant endpoint will return an error until this is configured.');
}

app.use(helmet());
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: FRONTEND_URL }));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/assistant', assistantRouter);
app.use('/api/contact', contactRouter);

app.listen(PORT, () => {
  console.log(`Namespace server running on port ${PORT} (frontend origin: ${FRONTEND_URL})`);
});
