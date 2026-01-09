import { Router } from 'express';
import { supabase } from '../supabase.js';

const router = Router();

/**
 * GET /api/dashboard
 * Retorna ações monitoradas pelo usuário
 */
router.get('/dashboard', async (req, res) => {
  const userId = req.headers['x-user-id'];

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  const { data, error } = await supabase
    .from('stocks')
    .select(`
      symbol,
      name,
      price,
      variation,
      open,
      high,
      low,
      user_stocks (
        user_id
      )
    `)
    .eq('user_stocks.user_id', userId);

  if (error) {
    console.error('Dashboard error:', error);
    return res.status(500).json({ error: error.message });
  }

  const result = data.map(stock => ({
    symbol: stock.symbol,
    name: stock.name,
    price: stock.price,
    variation: stock.variation,
    open: stock.open,
    high: stock.high,
    low: stock.low,
    monitor: Array.isArray(stock.user_stocks) && stock.user_stocks.length > 0
  }));

  res.json(result);
});

export default router;
