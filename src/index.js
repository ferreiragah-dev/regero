import express from 'express';
import dotenv from 'dotenv';
import { router } from './routes.js';
import { updateStockState } from './jobs.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', router);

app.listen(process.env.PORT, () => {
  console.log(`Backend running on port ${process.env.PORT}`);
});

// JOB a cada 1 minuto
updateStockState();
setInterval(updateStockState, 60_000);
