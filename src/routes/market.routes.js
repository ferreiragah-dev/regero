import express from 'express';
import { supabase } from '../services/supabase.js';

const router = express.Router();

router.post('/market/update', async (req, res) => {
  try {
    let payload = req.body;

    // 🔥 ACEITA OBJETO OU ARRAY
    const data = Array.isArray(payload) ? payload : [payload];

    // Validação mínima
    for (const item of data) {
      if (!item.symbol) {
        return res.status(400).json({ error: 'symbol is required' });
      }
    }

    const rows = data.map(item => ({
      symbol: item.symbol,
      price: item.price ?? null,
      variation: item.variation ?? null,
      open: item.open ?? null,
      high: item.high ?? null,
      low: item.low ?? null,
      volume: item.volume ?? null,
      updated_at: new Date()
    }));

    const { error } = await supabase
      .from('stocks')
      .upsert(rows, { onConflict: 'symbol' });

    if (error) {
      console.error('[MARKET UPDATE ERROR]', error);
      return res.status(500).json({ error: error.message });
    }

    return res.json({
      success: true,
      updated: rows.length,
      symbols: rows.map(r => r.symbol)
    });

  } catch (err) {
    console.error('[MARKET UPDATE EXCEPTION]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
