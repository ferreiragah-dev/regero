import express from 'express';
import { supabase } from '../services/supabase.js';

const router = express.Router();

/* LISTAR AÇÕES */
router.get('/stocks', async (req, res) => {
  const { data, error } = await supabase
    .from('stocks')
    .select('symbol, name')
    .order('symbol');

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

/* CRIAR AÇÃO */
router.post('/stocks', async (req, res) => {
  const { symbol, name } = req.body;

  if (!symbol || !name) {
    return res.status(400).json({ error: 'symbol and name are required' });
  }

  const { error } = await supabase
    .from('stocks')
    .insert([{ symbol: symbol.toUpperCase(), name }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ success: true });
});

export default router;
