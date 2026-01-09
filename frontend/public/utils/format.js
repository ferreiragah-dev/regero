export function formatPrice(value) {
  return `R$ ${value.toFixed(2)}`;
}

export function formatVariation(value) {
  return `${value >= 0 ? '+' : ''}${value}%`;
}
