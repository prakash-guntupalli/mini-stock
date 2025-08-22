import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type SortingState,
  type ColumnDef,
} from "@tanstack/react-table";
import type { Stock } from "../data/stocks";

interface StockTableProps {
  stocks: Stock[];
  searchQuery: string;
  onRowClick?: (stock: Stock) => void;
}

export default function StockTable({ stocks, searchQuery, onRowClick }: StockTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<Stock>[]>(
    () => [
      {
        accessorKey: "symbol",
        header: "Symbol",
        cell: (info) => (
          <div className="font-medium text-[var(--text)]">
            {info.getValue<string>()}
          </div>
        ),
        size: 120,
      },
      {
        accessorKey: "name",
        header: "Company Name",
        cell: (info) => (
          <div className="text-[var(--text-muted)] truncate max-w-[200px]" title={info.getValue<string>()}>
            {info.getValue<string>()}
          </div>
        ),
        size: 250,
      },
      {
        accessorKey: "price",
        header: "Current Price",
        cell: (info) => (
          <div className="font-mono text-right">
            ${info.getValue<number>().toFixed(2)}
          </div>
        ),
        size: 140,
      },
      {
        accessorKey: "change",
        header: "Daily Change",
        cell: (info) => {
          const value = info.getValue<number>();
          const color = value > 0 ? "text-[var(--pos)]" : value < 0 ? "text-[var(--neg)]" : "text-[var(--text-muted)]";
          return (
            <div className={`font-mono text-right ${color}`}>
              {value > 0 ? "+" : ""}{value.toFixed(2)}
            </div>
          );
        },
        size: 140,
      },
      {
        accessorKey: "pct",
        header: "% Change",
        cell: (info) => {
          const value = info.getValue<number>();
          const color = value > 0 ? "text-[var(--pos)]" : value < 0 ? "text-[var(--neg)]" : "text-[var(--text-muted)]";
          return (
            <div className={`font-mono text-right ${color}`}>
              {value > 0 ? "+" : ""}{value.toFixed(2)}%
            </div>
          );
        },
        size: 120,
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    if (!searchQuery) return stocks;
    const term = searchQuery.toLowerCase();
    return stocks.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(term) ||
        stock.name.toLowerCase().includes(term)
    );
  }, [stocks, searchQuery]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] overflow-hidden shadow-sm">
      <table className="w-full border-collapse">
        <thead className="bg-[var(--surface-muted)] border-b border-[var(--border)]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`px-4 py-4 text-left font-semibold text-sm text-[var(--text-muted)] border-r border-[var(--border)] last:border-r-0 ${
                    header.column.getCanSort() ? "cursor-pointer select-none hover:bg-[var(--border)] transition-colors" : ""
                  }`}
                  style={{ width: header.getSize() }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center justify-between">
                    <span>{flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}</span>
                    {header.column.getCanSort() && (
                      <div className="flex flex-col text-xs ml-2">
                        <span className={`${header.column.getIsSorted() === "asc" ? "text-[var(--brand)]" : "text-[var(--text-muted)]"}`}>
                          ↑
                        </span>
                        <span className={`${header.column.getIsSorted() === "desc" ? "text-[var(--brand)]" : "text-[var(--text-muted)]"}`}>
                          ↓
                        </span>
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--surface-muted)] transition-colors cursor-pointer"
              onClick={() => onRowClick?.(row.original)}
            >
              {row.getVisibleCells().map((cell, index) => (
                <td
                  key={cell.id}
                  className={`px-4 py-4 align-top border-r border-[var(--border)] last:border-r-0 ${
                    index === 0 ? "font-medium" : ""
                  }`}
                  style={{ width: cell.column.getSize() }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {table.getRowModel().rows.length === 0 && (
        <div className="p-8 text-center text-[var(--text-muted)]">
          No stocks found matching your search.
        </div>
      )}
    </div>
  );
}
