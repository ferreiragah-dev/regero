import express from 'express';
import { supabase } from '../services/supabase.js';

const router = express.Router();

router.get('/dashboard', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('stocks')
      .select('symbol, open_price, close_price, last_price, variation')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) throw error;

    res.json({
      stocks: data,
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    console.error('Dashboard error:', err.message);
    res.status(500).json({ error: 'Erro ao buscar dashboard' });
  }
});

export default router;
