import express from 'express';
import { supabase } from '../services/supabase.js';

const router = express.Router();

/**
 * POST /api/market/update
 * Body: [
 *   { symbol, price, variation, open, high, low }
 * ]
 */
router.post('/update', async (req, res) => {
  try {
    const updates = req.body;

    if (!Array.isArray(updates)) {
      return res.status(400).json({ error: 'Body must be an array' });
    }

    for (const item of updates) {
      if (!item.symbol) continue;

      await supabase
        .from('stocks')
        .update({
          price: item.price ?? null,
          variation: item.variation ?? null,
          open_price: item.open ?? null,
          high_price: item.high ?? null,
          low_price: item.low ?? null,
          updated_at: new Date().toISOString()
        })
        .eq('symbol', item.symbol);
    }

    res.json({ success: true, count: updates.length });
  } catch (err) {
    console.error('[MARKET UPDATE ERROR]', err);
    res.status(500).json({ error: 'Internal error' });
  }
});

export default router;
