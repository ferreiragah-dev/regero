import { fetchDashboard } from './api.js';
import { state } from './state.js';
import { render } from './render.js';

// token vindo do Supabase Auth
const SUPABASE_TOKEN = localStorage.getItem('sb-token');

async function load() {
  state.stocks = await fetchDashboard(SUPABASE_TOKEN);
  render(SUPABASE_TOKEN);
}

load();
setInterval(load, 60000);
