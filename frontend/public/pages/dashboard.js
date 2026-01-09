import { loadDashboard } from '../services/dashboard.service.js';

const board = document.getElementById('board');

export async function initDashboard() {
  board.innerHTML = '<p>Carregando...</p>';

  try {
    const { stocks } = await loadDashboard();

    if (stocks.length === 0) {
      board.innerHTML = `
        <div style="padding: 32px; color: #64748b;">
          Nenhuma ação monitorada ainda.
        </div>
      `;
      return;
    }

    board.innerHTML = stocks.map(stock => `
      <div class="card">
        <div class="symbol">${stock.symbol}</div>
        <div class="price">R$ ${stock.last_price ?? '-'}</div>
      </div>
    `).join('');

  } catch (err) {
    console.error(err);
    board.innerHTML = `
      <div style="padding: 32px; color: red;">
        Erro ao carregar dashboard
      </div>
    `;
  }
}
