import { useEffect, useRef } from "react";
import useFocusTrap from "./FocusTrap";
import type { Route } from "../App";

export default function NavDrawer({
  open,
  onClose,
  route,
  setRoute,
}: {
  open: boolean;
  onClose: () => void;
  route: Route;
  setRoute: (r: Route) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(open, ref);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && open && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleNavClick = (newRoute: Route) => {
    setRoute(newRoute);
    onClose();
  };

  return (
    <>
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={`fixed inset-0 z-40 ${
          open ? "bg-black/40" : "pointer-events-none"
        }`}
      ></div>
      <aside
        ref={ref}
        role="dialog"
        aria-modal="true"
        className={`fixed top-0 left-0 z-50 h-full w-[var(--drawer-width)] bg-[var(--surface)] border-r border-[var(--border)] transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 font-semibold text-lg border-b border-[var(--border)] bg-[var(--surface-muted)] flex items-center justify-between">
          <span>Navigation</span>
          <button
            onClick={onClose}
            aria-label="Close navigation"
            className="p-2 rounded-lg hover:bg-[var(--border)] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="p-4">
          <button
            onClick={() => handleNavClick("list")}
            className={`w-full text-left p-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-2 ${
              route === "list" 
                ? "bg-[var(--brand)] text-white shadow-md" 
                : "text-[var(--text)] hover:scale-105"
            }`}
          >
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3h18v18H3zM9 9h6M9 13h6M9 17h6" />
              </svg>
              <span className="font-medium">Stocks</span>   
            </div>
          </button>
          
          <button
            onClick={() => handleNavClick("favorites")}
            className={`w-full text-left p-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-2 mt-3 ${
              route === "favorites" 
                ? "bg-[var(--brand)] text-white shadow-md" 
                : "text-[var(--text)] hover:scale-105"
            }`}
          >
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="font-medium">Favorites</span>
            </div>
          </button>
          
          <div className="mt-8 pt-6 border-t border-[var(--border)]">
            {["Home", "Markets", "Portfolio", "Settings"].map((l) => (
              <a key={l} href="#" className="block p-3 rounded-lg hover:bg-[var(--surface-muted)] transition-colors text-[var(--text)] hover:text-[var(--brand)]">
                {l}
              </a>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
}
