import express from 'express';
import cors from 'cors';

import dashboardRoutes from './routes/dashboard.routes.js';
import authMiddleware from './middlewares/auth.middleware.js';
import protectedRoutes from './routes/index.js'; // se existir

const app = express();

app.use(cors());
app.use(express.json());

// 🔓 ROTA PÚBLICA
app.use('/api/dashboard', dashboardRoutes);

// 🔒 ROTAS PROTEGIDAS (se existirem)
if (protectedRoutes) {
  app.use('/api', authMiddleware, protectedRoutes);
}

// Healthcheck (EasyPanel)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
