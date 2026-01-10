import express from 'express';
import cors from 'cors';
import './cron/priceUpdater.js';
import stocksRoutes from './routes/stocks.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import monitorRoutes from './routes/monitor.routes.js'; // 👈 IMPORTANTE
app.use('/api', stocksRoutes);
import marketRoutes from './routes/market.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', marketRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', monitorRoutes); // 👈 ESSENCIAL

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

console.log('Index loaded');
