import type { Stock } from "../data/stocks";
import TableRow from "./TableRow";
import TableCell from "./TableCell";

interface StockTableRowProps {
  stock: Stock;
  onClick?: () => void;
}

export default function StockTableRow({ stock, onClick }: StockTableRowProps) {
  const changeColor = stock.change > 0 ? "text-[var(--pos)]" : stock.change < 0 ? "text-[var(--neg)]" : "text-[var(--text-muted)]";
  
  return (
    <TableRow onClick={onClick} hover={true}>
      <TableCell className="font-medium text-[var(--text)]">
        {stock.symbol}
      </TableCell>
      <TableCell className="text-[var(--text-muted)] truncate max-w-[200px]">
        {stock.name}
      </TableCell>
      <TableCell align="right" className="font-mono">
        ${stock.price.toFixed(2)}
      </TableCell>
      <TableCell align="right" className={`font-mono ${changeColor}`}>
        {stock.change > 0 ? "+" : ""}{stock.change.toFixed(2)}
      </TableCell>
      <TableCell align="right" className={`font-mono ${changeColor}`}>
        {stock.pct > 0 ? "+" : ""}{stock.pct.toFixed(2)}%
      </TableCell>
    </TableRow>
  );
}

