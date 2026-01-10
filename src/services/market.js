// src/services/market.js

/**
 * MOCK inicial de mercado
 * Depois você pode trocar por API real (B3, AlphaVantage, TwelveData, etc)
 */
export async function getStockPrice(symbol) {
  // Simulação básica
  const basePrices = {
    PETR4: 38.50,
    VALE3: 72.30
  };

  const base = basePrices[symbol] ?? 10;

  const variation = Number((Math.random() * 2 - 1).toFixed(2)); // -1% a +1%
  const price = Number((base * (1 + variation / 100)).toFixed(2));

  return {
    price,
    variation,
    open: base,
    high: Number((price * 1.01).toFixed(2)),
    low: Number((price * 0.99).toFixed(2))
  };
}
