import express from 'express';
import { supabase } from '../supabase.js';

const router = express.Router();

router.get('/dashboard', async (req, res) => {
  const userId = req.headers['x-user-id'];

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  // 1. Buscar símbolos monitorados pelo usuário
  const { data: monitored, error: monitorError } = await supabase
    .from('user_stocks')
    .select('symbol')
    .eq('user_id', userId);

  if (monitorError) {
    return res.status(500).json({ error: monitorError.message });
  }

  if (!monitored || monitored.length === 0) {
    return res.json([]);
  }

  const symbols = monitored.map(s => s.symbol);

  // 2. Buscar preços das ações
  const { data: stocks, error: stockError } = await supabase
    .from('stocks')
    .select(`
      symbol,
      open_price,
      close_price,
      last_price,
      variation
    `)
    .in('symbol', symbols);

  if (stockError) {
    return res.status(500).json({ error: stockError.message });
  }

  // 3. Normalizar resposta (frontend NÃO conhece schema)
  const result = stocks.map(stock => ({
    symbol: stock.symbol,
    price: stock.last_price ?? stock.close_price,
    open: stock.open_price,
    variation: stock.variation,
    monitor: true
  }));

  res.json(result);
});

export default router;
