const API_BASE_URL = 'https://stock-tracker-fintech-backend.watryz.easypanel.host';

export async function fetchDashboard() {
  const response = await fetch(`${API_BASE_URL}/api/dashboard`);

  if (!response.ok) {
    throw new Error('Erro ao buscar dashboard');
  }

  return response.json();
}
