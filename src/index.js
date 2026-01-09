import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { router } from './routes.js';
import { updateStockState } from './jobs.js';

dotenv.config();

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api', router);

// 🔥 HEALTHCHECK (importante para EasyPanel)
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// 🔥 PORTA DINÂMICA
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// JOB
updateStockState();
setInterval(updateStockState, 60_000);
