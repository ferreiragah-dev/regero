import express from 'express';
import { supabase } from '../services/supabase.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha obrigatórios' });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  return res.json({
    access_token: data.session.access_token,
    user: {
      id: data.user.id,
      email: data.user.email
    }
  });
});

export default router;
