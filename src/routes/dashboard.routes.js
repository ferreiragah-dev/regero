import express from 'express';
import { supabase } from '../services/supabase.js';


const router = express.Router();

router.get('/dashboard', async (req, res) => {
  const userId = req.headers['x-user-id'];

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  const { data, error } = await supabase
    .from('stocks')
    .select(`
      symbol,
      close_price,
      last_price,
      variation,
      user_stocks!left(user_id)
    `)
    .eq('user_stocks.user_id', userId);

  if (error) {
    console.error('Dashboard error:', error);
    return res.status(500).json({ error: error.message });
  }

  const result = data.map(stock => ({
    symbol: stock.symbol,
    price: stock.last_price ?? stock.close_price ?? 0,
    variation: stock.variation ?? 0,
    monitor: stock.user_stocks.length > 0
  }));

  res.json(result);
});

export default router;