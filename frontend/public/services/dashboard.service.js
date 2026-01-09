const API_URL = 'https://stock-tracker-fintech-backend.watryz.easypanel.host';

export async function loadDashboard() {
  const res = await fetch(`${API_URL}/api/dashboard`);

  if (!res.ok) {
    throw new Error('Erro ao buscar dashboard');
  }

  return res.json();
}
