import { useEffect, useRef, useState } from "react";
import type { Stock } from "../data/stocks";

export default function FavoritesPage({ allFavs }: { allFavs: Stock[] }) {
  const PAGE_SIZE = 25;
  const [items, setItems] = useState<Stock[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const position = useRef<HTMLDivElement>(null);

  // Simulate network call with delay and console logging
  const fetchPage = async (pageNum: number): Promise<Stock[]> => {
    console.log(`Fetching batch ${pageNum + 1}...`);
    console.log(`Network request: GET /api/favorites?page=${pageNum}&limit=${PAGE_SIZE}`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
    
    const startIndex = pageNum * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const slice = allFavs.slice(startIndex, endIndex);
    
    console.log(`Page ${pageNum + 1} loaded:`, {
      items: slice.length,
      total: allFavs.length,
      startIndex,
      endIndex,
      hasMore: endIndex < allFavs.length
    });
    
    return slice;
  };

  const loadMore = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const newItems = await fetchPage(page);
      
      if (newItems.length === 0) {
        setHasMore(false);
        console.log("No more items to load");
      } else {
        setItems(prev => [...prev, ...newItems]);
        setPage(prev => prev + 1);
        setHasMore(newItems.length === PAGE_SIZE);
      }
    } catch (error) {
      console.error("Error loading page:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  // implementing Lazy loading on scroll
  useEffect(() => {
    const el = position.current;
    if (!el) return;
    
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && hasMore) {
        loadMore();
      }
    }, {
      rootMargin: '100px' // Start loading when 100px away from viewport
    });
    
    io.observe(el);
    return () => io.disconnect();
  }, [loading, hasMore]);

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[var(--text)] mb-2">Favorites</h2>
        {/* <p className="text-[var(--text-muted)]">
          Showing {items.length} of {allFavs.length} favorite stocks
        </p> */}
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((s, idx) => (
          <article key={s.id + '-' + idx} className="border border-[var(--border)] p-4 rounded-lg bg-[var(--surface)] hover:shadow-md transition-shadow">
            <div className="font-semibold text-lg text-[var(--text)] mb-1">{s.symbol}</div>
            <div className="text-sm text-[var(--text-muted)] mb-3">{s.name}</div>
            <div className="text-xl font-mono text-[var(--text)] mb-3">${s.price.toFixed(2)}</div>
            <div className={`text-sm mb-3 ${s.change > 0 ? 'text-[var(--pos)]' : 'text-[var(--neg)]'}`}>
              {s.change > 0 ? "+" : ""}{s.change.toFixed(2)}
            </div>
            <div className={`text-sm ${s.pct > 0 ? 'text-[var(--pos)]' : 'text-[var(--neg)]'}`}>
              {s.pct > 0 ? "+" : ""}{s.pct.toFixed(2)}%
            </div>
          </article>
        ))}
      </div>
      
      <div ref={position} className="p-6 text-center">
        {loading && (
          <div className="text-[var(--text-muted)]">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--brand)] mr-2"></div>
            Loading more favorites...
          </div>
        )}
        {!loading && !hasMore && items.length > 0 && (
          <div className="text-[var(--text-muted)]">
            All favorites loaded!
          </div>
        )}
        {!loading && hasMore && (
          <div className="text-[var(--text-muted)]">
            Scroll down to load more
          </div>
        )}
      </div>
    </section>
  );
}
