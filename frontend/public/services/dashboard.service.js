import { fetchDashboard } from '../api/dashboard.api.js';

export async function loadDashboardData() {
  const data = await fetchDashboard();

  return data.map(item => ({
    symbol: item.symbol,
    name: item.name,
    price: item.price,
    variation: item.variation,
    open: item.open,
    high: item.high,
    low: item.low,
    monitor: true
  }));
}

export async function refreshDashboardData(stocks) {
  const data = await fetchDashboard();

  data.forEach(update => {
    const stock = stocks.find(s => s.symbol === update.symbol);
    if (!stock || !stock.monitor) return;

    stock.price = update.price;
    stock.variation = update.variation;
    stock.open = update.open;
    stock.high = update.high;
    stock.low = update.low;
  });
}
