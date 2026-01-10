import express from 'express';
import cors from 'cors';

import stocksRoutes from './routes/stocks.routes.js';
import marketRoutes from './routes/market.routes.js';
import { startPriceUpdater } from './cron/priceUpdater.js';

/* ✅ PRIMEIRO cria o app */
const app = express();

/* ✅ MIDDLEWARES */
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

/* ✅ ROTAS */
app.use('/api', stocksRoutes);
app.use('/api', marketRoutes);

/* HEALTH CHECK */
app.get('/health', (_, res) => {
  res.send('OK');
});

/* START SERVER */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
  startPriceUpdater(); // cron inicia DEPOIS que o app existe
});
