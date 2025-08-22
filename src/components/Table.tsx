import React from "react";

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export default function Table({ children, className = "" }: TableProps) {
  return (
    <div className={`bg-[var(--surface)] rounded-lg border border-[var(--border)] overflow-hidden ${className}`}>
      <table className="w-full">
        {children}
      </table>
    </div>
  );
}
