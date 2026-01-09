import { formatPrice, formatVariation } from '../utils/format.js';

export function Card(stock, index) {
  return `
    <div class="card">
      <div class="card-header">
        <div class="symbol">${stock.symbol}</div>
        <div class="toggle" onclick="window.toggleMonitor(${index})">
          <span>Monitorar</span>
          <div class="switch ${stock.monitor ? 'on' : ''}"></div>
        </div>
      </div>

      <div class="company">${stock.name}</div>

      <div class="price">${formatPrice(stock.price)}</div>

      <div class="variation ${stock.variation >= 0 ? 'up' : 'down'}">
        ${formatVariation(stock.variation)}
      </div>

      <div class="details">
        <div class="details-row"><span class="label">Abertura</span><span>${formatPrice(stock.open)}</span></div>
        <div class="details-row"><span class="label">Máxima</span><span>${formatPrice(stock.high)}</span></div>
        <div class="details-row"><span class="label">Mínima</span><span>${formatPrice(stock.low)}</span></div>
      </div>
    </div>
  `;
}
