import cron from 'node-cron';
import { supabase } from '../services/supabase.js';
import { getStockPrice } from '../services/market.js';

console.log('[CRON] Price updater carregado');

cron.schedule('*/1 * * * *', async () => {
  console.log('[CRON] Atualizando preços...');

  const { data: stocks, error } = await supabase
    .from('stocks')
    .select('symbol');

  if (error) {
    console.error('[CRON] Erro ao buscar stocks:', error);
    return;
  }

  for (const stock of stocks) {
    const prices = await getStockPrice(stock.symbol);

    await supabase
      .from('stocks')
      .update({
        price: prices.price,
        variation: prices.variation,
        open: prices.open,
        high: prices.high,
        low: prices.low,
        updated_at: new Date().toISOString()
      })
      .eq('symbol', stock.symbol);
  }

  console.log('[CRON] Preços atualizados');
});
