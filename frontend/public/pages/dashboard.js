import { loadDashboard } from '../services/dashboard.service.js';

export async function initDashboard() {
  const board = document.getElementById('board');
  board.innerHTML = '<p>Carregando...</p>';

  try {
    const { stocks } = await loadDashboard();

    if (!stocks.length) {
      board.innerHTML = '<p>Nenhuma ação monitorada ainda.</p>';
      return;
    }

    board.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Ativo</th>
            <th>Abertura</th>
            <th>Fechamento</th>
            <th>Último</th>
          </tr>
        </thead>
        <tbody>
          ${stocks.map(s => `
            <tr>
              <td>${s.symbol}</td>
              <td>${s.open_price ?? '-'}</td>
              <td>${s.close_price ?? '-'}</td>
              <td>${s.last_price ?? '-'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  } catch (e) {
    board.innerHTML = '<p style="color:red">Erro ao carregar dashboard</p>';
    console.error(e);
  }
}
