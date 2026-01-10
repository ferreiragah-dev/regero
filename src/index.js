import express from 'express';
import cors from 'cors';
import './cron/priceUpdater.js';

import dashboardRoutes from './routes/dashboard.routes.js';
import monitorRoutes from './routes/monitor.routes.js'; // 👈 IMPORTANTE

import marketRoutes from './routes/market.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/market', marketRoutes);
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
