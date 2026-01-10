import express from 'express';
import { supabase } from '../services/supabase.js';

const router = express.Router();

/**
 * Recebe dados do N8N
 * Segurança simples via header (opcional)
 */
router.post('/market/update', async (req, res) => {
  const secret = req.headers['x-n8n-secret'];

  if (process.env.N8N_SECRET && secret !== process.env.N8N_SECRET) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const stocks = req.body;

  if (!Array.isArray(stocks)) {
    return res.status(400).json({ error: 'invalid payload' });
  }

  for (const s of stocks) {
    await supabase
      .from('stocks')
      .upsert({
        symbol: s.symbol,
        price: s.price,
        variation: s.variation,
        open: s.open,
        high: s.high,
        low: s.low,
        updated_at: new Date().toISOString()
      }, { onConflict: 'symbol' });
  }

  return res.json({ success: true, count: stocks.length });
});

export default router;
