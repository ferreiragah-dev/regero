import { loadDashboardData } from '../services/dashboard.service.js';

export async function getDashboard(req, res) {
  try {
    const data = await loadDashboardData();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Dashboard error:', error);
    return res.status(500).json({ error: 'Failed to load dashboard' });
  }
}
