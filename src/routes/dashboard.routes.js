router.get('/dashboard', async (req, res) => {
  const userId = req.headers['x-user-id'];

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  const { data, error } = await supabase
    .from('stocks')
    .select(`
      symbol,
      name,
      price,
      variation,
      open,
      high,
      low,
      user_stocks!left(user_id)
    `)
    .eq('user_stocks.user_id', userId);

  if (error) return res.status(500).json({ error: error.message });

  const result = data.map(stock => ({
    ...stock,
    monitor: stock.user_stocks.length > 0
  }));

  res.json(result);
});
