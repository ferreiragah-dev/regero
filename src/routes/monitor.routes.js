import express from 'express';
import { supabase } from '../services/supabase.js';

const router = express.Router();

router.post('/monitor', async (req, res) => {
  const userId = req.headers['x-user-id'];
  const { symbol, monitor } = req.body;

  if (!userId || !symbol || typeof monitor !== 'boolean') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    if (monitor === true) {
      const { error } = await supabase
        .from('user_stocks')
        .upsert(
          { user_id: userId, symbol },
          { onConflict: 'user_id,symbol' }
        );

      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('user_stocks')
        .delete()
        .eq('user_id', userId)
        .eq('symbol', symbol);

      if (error) throw error;
    }

    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

export default router; // 👈 OBRIGATÓRIO
