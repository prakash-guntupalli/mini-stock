import React from "react";

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export default function TableRow({ children, className = "", onClick, hover = true }: TableRowProps) {
  return (
    <tr 
      className={`border-b border-[var(--border)] last:border-b-0 ${
        hover ? 'hover:bg-[var(--surface-muted)] transition-colors' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}
