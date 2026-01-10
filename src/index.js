import express from 'express';
import cors from 'cors';

import stocksRoutes from './routes/stocks.routes.js';
import marketRoutes from './routes/market.routes.js';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.use('/api', stocksRoutes);
app.use('/api', marketRoutes);

app.get('/health', (_, res) => {
  res.send('OK');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
});
