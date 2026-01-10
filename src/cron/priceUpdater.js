import { supabase } from "../services/supabase.js";
import cron from "node-cron";
import { fetchPrices } from "../services/market.js";

cron.schedule("*/5 * * * *", async () => {
  console.log("⏱ Atualizando preços...");

  const { data: stocks, error } = await supabase
    .from("stocks")
    .select("symbol");

  if (error) {
    console.error("Erro ao buscar stocks:", error);
    return;
  }

  if (!stocks?.length) return;

  const prices = await fetchPrices(stocks.map(s => s.symbol));

  for (const p of prices) {
    await supabase
      .from("stocks")
      .update({
        price: p.price,
        variation: p.variation,
        open_price: p.open,
        high_price: p.high,
        low_price: p.low,
        updated_at: new Date()
      })
      .eq("symbol", p.symbol);
  }

  console.log("✅ Preços atualizados");
});
