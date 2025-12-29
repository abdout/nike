export default function ProductDetailLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb skeleton */}
      <nav className="py-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-12 animate-pulse rounded bg-light-200" />
          <span className="text-dark-500">/</span>
          <div className="h-4 w-16 animate-pulse rounded bg-light-200" />
          <span className="text-dark-500">/</span>
          <div className="h-4 w-32 animate-pulse rounded bg-light-200" />
        </div>
      </nav>

      {/* Product section skeleton */}
      <section className="grid grid-cols-1 gap-8 pb-12 lg:grid-cols-2 lg:gap-12">
        {/* Image gallery skeleton */}
        <div className="space-y-4">
          <div className="aspect-square w-full animate-pulse rounded-xl bg-light-200" />
          <div className="flex gap-2 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 w-20 flex-shrink-0 animate-pulse rounded-lg bg-light-200" />
            ))}
          </div>
        </div>

        {/* Product info skeleton */}
        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <div className="h-8 w-3/4 animate-pulse rounded bg-light-200" />
            <div className="h-5 w-1/3 animate-pulse rounded bg-light-200" />
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-24 animate-pulse rounded bg-light-200" />
            <div className="h-5 w-16 animate-pulse rounded bg-light-200" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-light-200" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-light-200" />
            <div className="h-4 w-4/6 animate-pulse rounded bg-light-200" />
          </div>

          {/* Color swatches skeleton */}
          <div className="space-y-2">
            <div className="h-5 w-16 animate-pulse rounded bg-light-200" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-10 w-10 animate-pulse rounded-full bg-light-200" />
              ))}
            </div>
          </div>

          {/* Size picker skeleton */}
          <div className="space-y-2">
            <div className="h-5 w-20 animate-pulse rounded bg-light-200" />
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-10 animate-pulse rounded-lg bg-light-200" />
              ))}
            </div>
          </div>

          {/* Buttons skeleton */}
          <div className="flex gap-4">
            <div className="h-12 flex-1 animate-pulse rounded-full bg-light-200" />
            <div className="h-12 w-12 animate-pulse rounded-full bg-light-200" />
          </div>
        </div>
      </section>

      {/* Reviews section skeleton */}
      <section className="border-t border-light-300 py-12">
        <div className="h-6 w-32 animate-pulse rounded bg-light-200" />
        <div className="mt-6 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-light-300 p-4">
              <div className="flex items-center gap-2">
                <div className="h-4 w-24 animate-pulse rounded bg-light-200" />
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} className="h-4 w-4 animate-pulse rounded bg-light-200" />
                  ))}
                </div>
              </div>
              <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-light-200" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
