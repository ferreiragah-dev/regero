import express from 'express';
import { supabase } from '../services/supabase.js';

const router = express.Router();

router.get('/dashboard', async (req, res) => {
  const userId = req.headers['x-user-id'];

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  const { data, error } = await supabase
    .from('user_stocks')
    .select(`
      symbol,
      stocks (
        open_price,
        close_price,
        last_price,
        variation
      )
    `)
    .eq('user_id', userId)
    .eq('monitor', true);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const response = data.map(row => ({
    symbol: row.symbol,
    price: row.stocks?.last_price,
    variation: row.stocks?.variation,
    open: row.stocks?.open_price
  }));

  res.json(response);
});

export default router;
