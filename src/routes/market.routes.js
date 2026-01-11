import express from 'express';
import { supabase } from '../services/supabase.js';

const router = express.Router();

/**
 * POST /api/market/update
 * Recebe dados do EA (objeto ou array)
 */
router.post('/market/update', async (req, res) => {
  try {
    const payload = Array.isArray(req.body) ? req.body : [req.body];
    const now = new Date();

    const stocksRows = [];
    const historyRows = [];

    for (const item of payload) {
      if (!item.symbol) {
        return res.status(400).json({ error: 'symbol is required' });
      }

      stocksRows.push({
        symbol: item.symbol,
        price: item.price ?? null,
        variation: item.variation ?? null,
        open: item.open ?? null,
        high: item.high ?? null,
        low: item.low ?? null,
        volume: item.volume ?? null,
        updated_at: now
      });

      historyRows.push({
        symbol: item.symbol,
        price: item.price ?? null,
        variation: item.variation ?? null,
        open: item.open ?? null,
        high: item.high ?? null,
        low: item.low ?? null,
        volume: item.volume ?? null,
        created_at: now
      });
    }

    await supabase.from('stocks').upsert(stocksRows, {
      onConflict: 'symbol'
    });

    await supabase.from('stock_prices').insert(historyRows);

    res.json({ success: true, updated: stocksRows.length });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/market/history/:symbol
 */
router.get('/market/history/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const limit = Number(req.query.limit ?? 200);

  const { data, error } = await supabase
    .from('stock_prices')
    .select('price, created_at')
    .eq('symbol', symbol)
    .order('created_at', { ascending: true })
    .limit(limit);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

export default router;
