import React from "react";

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  padding?: "sm" | "md" | "lg";
  colSpan?: number;
}

export default function TableCell({ 
  children, 
  className = "", 
  align = "left", 
  padding = "md",
  colSpan 
}: TableCellProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center", 
    right: "text-right"
  };

  const paddingClasses = {
    sm: "px-2 py-2",
    md: "px-3 py-3",
    lg: "px-4 py-4"
  };

  return (
    <td 
      className={`${alignmentClasses[align]} ${paddingClasses[padding]} ${className}`}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
}
