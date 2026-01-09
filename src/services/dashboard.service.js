import { supabase } from '../utils/supabase.js';

export async function loadDashboardData() {
  const { data, error } = await supabase
    .from('stocks')
    .select('*')
    .order('symbol');

  if (error) {
    throw error;
  }

  return {
    stocks: data,
    updatedAt: new Date().toISOString()
  };
}
