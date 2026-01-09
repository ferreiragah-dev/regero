import express from 'express';
import { supabase } from '../db.js';
import { authMiddleware } from '../auth.js';

export const router = express.Router();

router.use(authMiddleware);

/**
 * DASHBOARD
 */
router.get('/dashboard', async (req, res) => {
  const userId = req.user.id;

  const { data: stocks } = await supabase
    .from('user_stocks')
    .select('symbol, monitor')
    .eq('user_id', userId);

  const symbols = stocks.map(s => s.symbol);

  const { data: states } = await supabase
    .from('stock_state')
    .select('*')
    .in('symbol', symbols);

  const { data: history } = await supabase
    .from('stock_history')
    .select('symbol, price, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  const response = symbols.map(symbol => {
    const state = states.find(s => s.symbol === symbol);
    const user = stocks.find(s => s.symbol === symbol);

    return {
      symbol,
      price: state?.price ?? 0,
      variation: state?.variation ?? 0,
      open: state?.open ?? 0,
      high: state?.high ?? 0,
      low: state?.low ?? 0,
      volume: '—',
      monitor: user.monitor,
      history: history
        .filter(h => h.symbol === symbol)
        .slice(-30)
        .map(h => ({
          time: new Date(h.created_at).toLocaleTimeString(),
          price: h.price
        }))
    };
  });

  res.json(response);
});

/**
 * TOGGLE MONITOR
 */
router.post('/stocks/:symbol/monitor', async (req, res) => {
  const { symbol } = req.params;
  const userId = req.user.id;

  const { data } = await supabase
    .from('user_stocks')
    .select('monitor')
    .eq('user_id', userId)
    .eq('symbol', symbol)
    .single();

  await supabase
    .from('user_stocks')
    .update({ monitor: !data.monitor })
    .eq('user_id', userId)
    .eq('symbol', symbol);

  res.sendStatus(200);
});
