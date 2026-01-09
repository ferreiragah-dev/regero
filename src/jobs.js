import { supabase } from './db.js';
import { fetchMarketData } from './n8n.js';

export async function updateStockState() {
  const data = await fetchMarketData();

  for (const item of data) {
    const price = item.last_price ?? item.close_price ?? 0;
    const open = item.open_price ?? price;

    const variation = open
      ? Number((((price - open) / open) * 100).toFixed(2))
      : 0;

    await supabase
      .from('stock_state')
      .upsert({
        symbol: item.symbol,
        price,
        open,
        high: price * 1.01,
        low: price * 0.99,
        variation,
        updated_at: new Date().toISOString()
      });
  }

  // grava histórico APENAS para usuários que monitoram
  const { data: monitored } = await supabase
    .from('user_stocks')
    .select('user_id, symbol')
    .eq('monitor', true);

  for (const row of monitored || []) {
    const { data: state } = await supabase
      .from('stock_state')
      .select('price')
      .eq('symbol', row.symbol)
      .single();

    if (!state) continue;

    await supabase.from('stock_history').insert({
      user_id: row.user_id,
      symbol: row.symbol,
      price: state.price
    });
  }
}
