import type { Route } from "../App";

export default function Header({
  onHamburger,
  route,
  setRoute,
}: {
  onHamburger: () => void;
  route: Route;
  setRoute: (r: Route) => void;
}) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-30 border-b"
      style={{ height: "var(--header-height)", background: "var(--surface)" }}
    >
      <div className="h-full flex items-center gap-3 px-3 sm:px-4">
        <button
          aria-label="Open navigation"
          onClick={onHamburger}
          className="p-2 rounded-xl hover:bg-[var(--surface-muted)] transition-colors"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeWidth="2"
              strokeLinecap="round"
              d="M3 6h18M3 12h18M3 18h18"
            />
          </svg>
        </button>
        <div className="font-semibold text-lg">Stock Dashboard</div>
        <nav className="ml-auto flex gap-2">
          <button
            onClick={() => setRoute("list")}
            className={
              route === "list"
                ? "bg-[var(--brand)] text-white px-4 py-2 rounded-lg font-medium transition-colors"
                : "px-4 py-2 rounded-lg font-medium hover:bg-[var(--surface-muted)] transition-colors"
            }
          >
            Stocks
          </button>
          <button
            onClick={() => setRoute("favorites")}
            className={
              route === "favorites"
                ? "bg-[var(--brand)] text-white px-4 py-2 rounded-lg font-medium transition-colors"
                : "px-4 py-2 rounded-lg font-medium hover:bg-[var(--surface-muted)] transition-colors"
            }
          >
            Favorites
          </button>
        </nav>
      </div>
    </header>
  );
}
