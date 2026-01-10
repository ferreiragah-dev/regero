import express from 'express';
import cors from 'cors';

import dashboardRoutes from './routes/dashboard.routes.js';
import stocksRoutes from './routes/stocks.routes.js';
import marketRoutes from './routes/market.routes.js';

const app = express();

/* 🔥 CORS PRIMEIRO */
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id']
}));

app.use(express.json());

/* 🔥 ROTAS DEPOIS */
app.use('/api', dashboardRoutes);
app.use('/api', stocksRoutes);
app.use('/api', marketRoutes);

app.get('/health', (_, res) => res.send('OK'));

app.listen(3000, () => {
  console.log('🚀 Backend rodando');
});
