router.post('/monitor', async (req, res) => {
  const userId = req.headers['x-user-id'];
  const { symbol, monitor } = req.body;

  if (!userId || !symbol || typeof monitor !== 'boolean') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    if (monitor === true) {
      // INSERT somente se não existir
      const { error } = await supabase
        .from('user_stocks')
        .upsert(
          { user_id: userId, symbol },
          { onConflict: 'user_id,symbol' }
        );

      if (error) throw error;
    } else {
      // DELETE quando monitor = false
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
