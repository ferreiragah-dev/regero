import express from 'express';
import { supabase } from '../services/supabase.js';

const router = express.Router();

router.get('/dashboard', async (req, res) => {
  try {
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
        low
      `)
      .order('symbol');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(data || []);
  } catch (err) {
    console.error('[DASHBOARD ERROR]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
