const API_BASE_URL =
  'https://stock-tracker-fintech-backend.watryz.easypanel.host/api';

export async function fetchDashboard() {
  const res = await fetch(`${API_BASE_URL}/dashboard`);
  if (!res.ok) throw new Error('Erro ao buscar dashboard');
  return res.json();
}
