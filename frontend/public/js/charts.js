export function drawChart(canvas, history) {
  if (!canvas || !history || history.length < 2) return;

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const prices = history.map(h => h.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  const pad = 6;
  const sx = (canvas.width - pad * 2) / (prices.length - 1);
  const sy = (canvas.height - pad * 2) / (max - min || 1);

  ctx.beginPath();
  ctx.strokeStyle = '#2563eb';
  ctx.lineWidth = 2;

  prices.forEach((p, i) => {
    const x = pad + i * sx;
    const y = canvas.height - pad - (p - min) * sy;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });

  ctx.stroke();
}
