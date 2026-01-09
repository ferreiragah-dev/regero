const API_BASE_URL =
  'https://stock-tracker-fintech-backend.watryz.easypanel.host/api';

// ⚠️ por enquanto fixo (depois vira login real)
const USER_ID = 'demo-user-001';

export async function fetchDashboard() {
  const res = await fetch(`${API_BASE_URL}/dashboard`, {
    headers: {
      'x-user-id': USER_ID
    }
  });

  if (!res.ok) {
    throw new Error('Erro ao carregar dashboard');
  }

  return res.json();
}

export async function toggleMonitor(symbol, monitor) {
  const res = await fetch(`${API_BASE_URL}/monitor`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': USER_ID
    },
    body: JSON.stringify({ symbol, monitor })
  });

  if (!res.ok) {
    throw new Error('Erro ao salvar monitoramento');
  }

  return res.json();
}
