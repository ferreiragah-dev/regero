import express from 'express';
import { supabase } from '../services/supabase.js';

const router = express.Router();

/**
 * GET /api/market/history/:symbol?days=7
 */
router.get('/market/history/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const days = Number(req.query.days ?? 7);

    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);

    const { data, error } = await supabase
      .from('stock_prices')
      .select('price, created_at')
      .eq('symbol', symbol)
      .gte('created_at', fromDate.toISOString())
      .order('created_at', { ascending: true });

    if (error) {
      console.error('[HISTORY ERROR]', error);
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    console.error('[HISTORY EXCEPTION]', err);
    return res.status(500).json({ error: 'internal error' });
  }
});

export default router;
