import { Router } from 'express';
import { getDashboard } from '../controllers/dashboard.controller.js';

const router = Router();

/**
 * Rota pública
 * GET /api/dashboard
 */
router.get('/', getDashboard);

export default router;
