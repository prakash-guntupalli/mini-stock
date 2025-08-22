import React from "react";

interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export default function TableHeader({ children, className = "" }: TableHeaderProps) {
  return (
    <thead className={`bg-[var(--surface-muted)] border-b border-[var(--border)] ${className}`}>
      {children}
    </thead>
  );
}
