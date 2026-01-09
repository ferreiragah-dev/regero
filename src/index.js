import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { router } from './routes.js';
import { updateStockState } from './jobs.js';

dotenv.config();

const app = express();

/* ===============================
   MIDDLEWARES
================================ */
app.use(cors({ origin: '*' }));
app.use(express.json());

/* ===============================
   ROOT HEALTHCHECK (OBRIGATÓRIO)
   EasyPanel testa GET /
================================ */
app.get('/', (req, res) => {
  res.status(200).send('OK');
});

/* ===============================
   HEALTH EXPLÍCITO (opcional)
================================ */
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

/* ===============================
   API ROUTES
================================ */
app.use('/api', router);

/* ===============================
   SERVER
================================ */
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

/* ===============================
   SAFE BACKGROUND JOB
   (NUNCA derruba o processo)
================================ */
async function safeJob() {
  try {
    await updateStockState();
  } catch (err) {
    console.error('[JOB ERROR]', err?.message || err);
  }
}

// primeira execução
safeJob();

// loop a cada 1 minuto
setInterval(safeJob, 60_000);
