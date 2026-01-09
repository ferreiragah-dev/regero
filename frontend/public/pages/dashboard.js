import { loadDashboardData, refreshDashboardData } from '../services/dashboard.service.js';
import { store } from '../state/store.js';
import { Board } from '../components/Board.js';

const boardEl = document.getElementById('board');

export async function initDashboard() {
  store.stocks = await loadDashboardData();
  render();

  setInterval(async () => {
    await refreshDashboardData(store.stocks);
    render();
  }, 60_000);
}

function render() {
  boardEl.innerHTML = Board(store.stocks);
}

window.toggleMonitor = function (index) {
  store.stocks[index].monitor = !store.stocks[index].monitor;
  render();
};
