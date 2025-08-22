import { useMemo, useState } from "react";
import type { Stock } from "../data/stocks";
import StockRow from "../components/StockRow";

type SortKey = "price" | "pct";

export default function StockListPage({ stocks }: { stocks: Stock[] }) {
  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("price");
  const [asc, setAsc] = useState(false);

  const filtered = useMemo(() => {  //filter results either by symbol or company name
    const term = q.toLowerCase();
    let list = term
      ? stocks.filter((s) =>
          s.symbol.toLowerCase().includes(term) || s.name.toLowerCase().includes(term)
        )
      : stocks;
    return [...list].sort((a, b) =>
      asc ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]
    );
  }, [q, stocks, sortKey, asc]);

  return (
    <section>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search stocks..."
          className="flex-1 border border-[var(--border)] p-2 rounded-lg bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent"
        />
        <div className="flex gap-2">
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="border border-[var(--border)] p-2 rounded-lg bg-[var(--surface)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent"
          >
            <option value="price">Price</option>
            <option value="pct">% Change</option>
          </select>
          <button
            onClick={() => setAsc((a) => !a)}
            className="border border-[var(--border)] p-2 rounded-lg bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--surface-muted)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent"
          >
            {asc ? "↑ Asc" : "↓ Desc"}
          </button>
        </div>
      </div>
      <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] overflow-hidden">
        <div className="grid grid-cols-12 gap-2 px-3 py-3 bg-[var(--surface-muted)] border-b border-[var(--border)] font-medium text-sm text-[var(--text-muted)]">
          <div className="col-span-3">Symbol</div>
          <div className="col-span-3">Company Name</div>
          <div className="col-span-2 text-right">CurrentPrice</div>
          <div className="col-span-2 text-right">Daily Change</div>
          <div className="col-span-2 text-right">% Change</div>
        </div>
        {filtered.map((s, idx) => (
          <StockRow key={s.id + '-' + idx} item={s} />
        ))}
      </div>
    </section>
  );
}
