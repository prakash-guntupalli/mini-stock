import { useState } from "react";
import type { Stock } from "../data/stocks";
import StockTable from "../components/StockTable";

export default function StockListPage({ stocks }: { stocks: Stock[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section>
      <div className="mb-6">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search stocks by symbol or company name..."
          className="w-full max-w-md border border-[var(--border)] p-3 rounded-lg bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent"
        />
      </div>
      
      <StockTable 
        stocks={stocks} 
        searchQuery={searchQuery}
      />
    </section>
  );
}
