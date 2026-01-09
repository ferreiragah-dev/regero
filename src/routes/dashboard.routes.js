import express from 'express';
import { supabase } from '../services/supabase.js';

const router = express.Router();

router.get('/dashboard', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('stocks')
      .select(`
        symbol,
        open_price,
        close_price,
        last_price,
        variation,
        created_at
      `)
      .is('error', null)
      .order('symbol', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao buscar stocks' });
    }

    // 1 linha por ação (mais recente)
    const map = new Map();

    data.forEach(row => {
      if (!map.has(row.symbol)) {
        map.set(row.symbol, {
          symbol: row.symbol,
          open_price: row.open_price,
          close_price: row.close_price,
          last_price: row.last_price ?? row.close_price,
          variation: row.variation ?? 0,
          updated_at: row.created_at
        });
      }
    });

    const stocks = Array.from(map.values());

    res.json({
      stocks,
      updatedAt: new Date().toISOString()
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro inesperado no dashboard' });
  }
});

export default router;
