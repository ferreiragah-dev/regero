const API_URL = 'http://localhost:3000/api';

export async function fetchDashboard(token) {
  const res = await fetch(`${API_URL}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
}

export async function toggleMonitor(symbol, token) {
  await fetch(`${API_URL}/stocks/${symbol}/monitor`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
