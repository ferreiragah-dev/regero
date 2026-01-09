import express from 'express';
import { supabase } from '../services/supabase.js';

const router = express.Router();

router.post('/monitor', async (req, res) => {
  const userId = req.headers['x-user-id'];
  const { symbol, monitor } = req.body;

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  if (!symbol) {
    return res.status(400).json({ error: 'Symbol is required' });
  }

  const { error } = await supabase
    .from('user_stocks')
    .upsert({
      user_id: userId,
      symbol,
      monitor
    });

  if (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

  res.json({ success: true });
});

export default router;
console.log('Monitor routes loaded');
