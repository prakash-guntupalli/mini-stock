export type Stock = {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  pct: number;
};

export function makeStocks(count: number, _p0: number) {
  const stocks: Stock[] = [];
  
  for (let i = 0; i < count; i++) {
    const symbol = `STK${(i + 1).toString().padStart(4, '0')}`;
    const price = +(Math.random() * 1000).toFixed(2);
    const change = +(Math.random() * 20 - 10).toFixed(2);
    const pct = +((change / price) * 100).toFixed(2);

    stocks.push({
      id: symbol,
      symbol,
      name: `Company ${i + 1}`,
      price,
      change,
      pct
    });
  }

  return stocks;
}