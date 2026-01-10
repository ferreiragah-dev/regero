import express from 'express';
import { supabase } from '../services/supabase.js';

const router = express.Router();

router.post('/market/update', async (req, res) => {
  try {
    const payload = req.body;

    // 🔥 aceita objeto único ou array
    const data = Array.isArray(payload) ? payload : [payload];

    // validação mínima
    for (const item of data) {
      if (!item.symbol) {
        return res.status(400).json({ error: 'symbol is required' });
      }
    }

    const results = [];

    for (const item of data) {
      const { error } = await supabase
        .from('stocks')
        .update({
          price: item.price ?? null,
          variation: item.variation ?? null,
          open: item.open ?? null,
          high: item.high ?? null,
          low: item.low ?? null,
          volume: item.volume ?? null,
          updated_at: new Date().toISOString()
        })
        .eq('symbol', item.symbol);

      if (error) {
        console.error('[MARKET UPDATE ERROR]', item.symbol, error);
        return res.status(500).json({ error: error.message });
      }

      results.push(item.symbol);
    }

    return res.json({
      success: true,
      updated: results.length,
      symbols: results
    });

  } catch (err) {
    console.error('[MARKET UPDATE EXCEPTION]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
