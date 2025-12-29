export default function ProductsLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header skeleton */}
      <header className="flex items-center justify-between py-6">
        <div className="h-8 w-48 animate-pulse rounded bg-light-200" />
        <div className="h-10 w-32 animate-pulse rounded-lg bg-light-200" />
      </header>

      {/* Content skeleton */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr]">
        {/* Filters sidebar skeleton (desktop) */}
        <aside className="hidden space-y-4 md:block">
          <div className="h-6 w-24 animate-pulse rounded bg-light-200" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-5 w-20 animate-pulse rounded bg-light-200" />
              <div className="space-y-1.5">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="h-4 w-32 animate-pulse rounded bg-light-200" />
                ))}
              </div>
            </div>
          ))}
        </aside>

        {/* Products grid skeleton */}
        <div className="grid grid-cols-1 gap-6 pb-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <article key={i} className="group">
              {/* Image skeleton */}
              <div className="relative aspect-[5/4] animate-pulse overflow-hidden rounded-xl bg-light-200" />
              {/* Text skeleton */}
              <div className="mt-4 space-y-2">
                <div className="h-5 w-3/4 animate-pulse rounded bg-light-200" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-light-200" />
                <div className="h-4 w-1/4 animate-pulse rounded bg-light-200" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
