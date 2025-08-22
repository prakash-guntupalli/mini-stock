import { useEffect, useRef } from "react";
import useFocusTrap from "./FocusTrap";

export default function NavDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(open, ref);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && open && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

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
          <span>Menu</span>
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
          {["Home", "Markets", "Portfolio", "Settings"].map((l) => (
            <a key={l} href="#" className="block p-3 rounded-lg hover:bg-[var(--surface-muted)] transition-colors text-[var(--text)]">
              {l}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
