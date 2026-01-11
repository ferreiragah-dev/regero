import express from 'express';
import { supabase } from '../services/supabase.js';

const router = express.Router();

/**
 * GET /api/candles/:symbol?tf=D1|H1|M15
 * Retorna últimos candles do ativo
 */
router.get('/candles/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const tf = req.query.tf || 'D1';

    if (!symbol) {
      return res.status(400).json({ error: 'symbol is required' });
    }

    const { data, error } = await supabase
      .from('stock_candles')
      .select(`
        symbol,
        timeframe,
        open,
        high,
        low,
        close,
        volume,
        candle_time
      `)
      .eq('symbol', symbol)
      .eq('timeframe', tf)
      .order('candle_time', { ascending: true })
      .limit(100);

    if (error) {
      console.error('[CANDLES FETCH ERROR]', error);
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    console.error('[CANDLES EXCEPTION]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/candles/update
 * Recebe candles do EA MT5 (array ou objeto)
 */
router.post('/candles/update', async (req, res) => {
  try {
    const payload = Array.isArray(req.body) ? req.body : [req.body];

    const rows = payload.map(c => ({
      symbol: c.symbol,
      timeframe: c.timeframe,
      open: c.open,
      high: c.high,
      low: c.low,
      close: c.close,
      volume: c.volume ?? 0,
      candle_time: c.candle_time,
      updated_at: new Date()
    }));

    const { error } = await supabase
      .from('stock_candles')
      .upsert(rows, {
        onConflict: 'symbol,timeframe,candle_time'
      });

    if (error) {
      console.error('[CANDLES UPSERT ERROR]', error);
      return res.status(500).json({ error: error.message });
    }

    return res.json({
      success: true,
      inserted: rows.length
    });
  } catch (err) {
    console.error('[CANDLES UPSERT EXCEPTION]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
