import { Card } from './Card.js';

export function Board(stocks) {
  return stocks.map((s, i) => Card(s, i)).join('');
}
