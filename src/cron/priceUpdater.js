import supabase from '../services/supabase.js';

/**
 * 🔁 Função que busca preços (mock agora)
 * Depois você troca pela API real
 */
async function fetchMarketPrices() {
  // MOCK — substitua pela API real depois
  return [
    {
      symbol: 'PETR4',
      price: 37.12,
      open: 36.5,
      high: 37.4,
      low: 36.3
    },
    {
      symbol: 'VALE3',
      price: 62.80,
      open: 61.9,
      high: 63.2,
      low: 61.5
    }
  ];
}

/**
 * 🚀 Atualiza tabela stocks
 */
export async function startPriceUpdater() {
  console.log('⏱️ Stock price updater started');

  setInterval(async () => {
    try {
      const prices = await fetchMarketPrices();

      for (const p of prices) {
        const variation =
          p.open && p.price
            ? ((p.price - p.open) / p.open) * 100
            : 0;

        const { error } = await supabase
          .from('stocks')
          .update({
            price: p.price,
            open: p.open,
            high: p.high,
            low: p.low,
            variation: Number(variation.toFixed(2))
          })
          .eq('symbol', p.symbol);

        if (error) {
          console.error(`❌ Error updating ${p.symbol}`, error.message);
        }
      }

      console.log('✅ Stocks updated at', new Date().toISOString());

    } catch (err) {
      console.error('❌ Price updater failed', err);
    }
  }, 60_000); // 1 minuto
}
