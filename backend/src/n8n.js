import fetch from 'node-fetch';

export async function fetchMarketData() {
  const res = await fetch(process.env.N8N_URL);
  if (!res.ok) throw new Error('Failed to fetch n8n data');
  return res.json();
}
