// frontend/js/services/dashboard.service.js

import { fetchDashboard } from '../api/dashboard.api.js';

export async function loadDashboard() {
  const data = await fetchDashboard();

  // GARANTIA DE SEGURANÇA
  return {
    stocks: Array.isArray(data.stocks) ? data.stocks : [],
    updatedAt: data.updatedAt
  };
}
