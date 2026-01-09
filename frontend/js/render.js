import { state } from './state.js';
import { toggleMonitor } from './api.js';
import { drawChart } from './chart.js';

export function render(token) {
  const board = document.getElementById('board');

  board.innerHTML = state.stocks.map((s, i) => `
    <div class="card ${s.expanded ? 'expanded' : ''}">
      <div class="card-header">
        <div class="symbol">${s.symbol}</div>
        <div class="toggle" data-i="${i}">
          <span>Monitorar</span>
          <div class="switch ${s.monitor ? 'on' : ''}"></div>
        </div>
      </div>

      <div class="company">${s.name || s.symbol}</div>
      <div class="price">R$ ${s.price.toFixed(2)}</div>

      <div class="variation ${s.variation >= 0 ? 'up' : 'down'}">
        ${s.variation >= 0 ? '+' : ''}${s.variation}%
      </div>

      <div class="details">
        <div class="details-row"><span>Abertura</span><span>R$ ${s.open.toFixed(2)}</span></div>
        <div class="details-row"><span>Máxima</span><span>R$ ${s.high.toFixed(2)}</span></div>
        <div class="details-row"><span>Mínima</span><span>R$ ${s.low.toFixed(2)}</span></div>
        <div class="details-row"><span>Volume</span><span>${s.volume}</span></div>

        <canvas id="chart-${i}" width="220" height="80" style="margin-top:12px"></canvas>
      </div>

      <div class="expand" data-expand="${i}">
        <div class="chevron"></div>
      </div>
    </div>
  `).join('');

  // eventos
  document.querySelectorAll('.toggle').forEach(el => {
    el.onclick = async () => {
      const i = el.dataset.i;
      await toggleMonitor(state.stocks[i].symbol, token);
    };
  });

  document.querySelectorAll('.expand').forEach(el => {
    el.onclick = () => {
      const i = el.dataset.expand;
      state.stocks[i].expanded = !state.stocks[i].expanded;
      render(token);

      if (state.stocks[i].expanded) {
        setTimeout(() => {
          drawChart(
            document.getElementById(`chart-${i}`),
            state.stocks[i].history
          );
        }, 50);
      }
    };
  });
}
