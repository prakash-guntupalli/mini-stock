import type { Stock } from "../data/stocks";

export default function StockRow({ item }: { item: Stock }) {
  const badge =
  item.change > 0
      ? "text-[var(--pos)]"
      : item.change < 0
      ? "text-[var(--neg)]"
      : "text-[var(--text-muted)]";
  return (
    <div className="grid grid-cols-12 gap-2 px-3 py-3 border-b border-[var(--border)] hover:bg-[var(--surface)] transition-colors">
      <div className="col-span-3 font-medium text-[var(--text)]">{item.symbol}</div>
      <div className="col-span-3 text-[var(--text-muted)] truncate">{item.name}</div>
      <div className="col-span-2 text-right font-mono">${item.price.toFixed(2)}</div>
      <div className={`col-span-2 text-right font-mono ${badge}`}>
        {item.change > 0 ? "+" : ""}{item.change.toFixed(2)}
      </div>
      <div className={`col-span-2 text-right font-mono ${badge}`}>
        {item.pct > 0 ? "+" : ""}{item.pct.toFixed(2)}%
      </div>
    </div>
  );
}
