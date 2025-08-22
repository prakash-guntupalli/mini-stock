import { useMemo, useState } from "react";
import Header from "./components/Header";
import Drawer from "./components/NavDrawer";
import StockListPage from "./pages/StockListPage";
import FavoritesPage from "./pages/FavoritesPage";
import { makeStocks } from "./data/stocks";

export type Route = "list" | "favorites";

function App() {
  const [route, setRoute] = useState<Route>("list");
  const [drawer, setDrawer] = useState(false);

  const allStocks = useMemo(() => makeStocks(1000, 2025), []);
  const allFavs = useMemo(() => makeStocks(500, 777), []);

  return (
    <div className="min-h-screen bg-[var(--surface-muted)] text-[var(--text)] flex flex-col">
      <Header
        onHamburger={() => setDrawer(true)}
        route={route}
        setRoute={setRoute}
      />
      <Drawer open={drawer} onClose={() => setDrawer(false)} />

      <main className="pt-16 px-3 sm:px-4 pb-8">
        {route === "list" ? (
          <StockListPage stocks={allStocks} />
        ) : (
          <FavoritesPage allFavs={allFavs} />
        )}
      </main>

      <footer className="mt-auto py-6 text-center text-xs text-[var(--text-muted)] border-t border-[var(--border)]">
        <div>Mini Stock Quote Dashboard</div>
      </footer>
    </div>
  );
}

export default App;
