"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const lang = params?.lang || "en";

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <h2 className="text-heading-3 text-dark-900">Failed to load products</h2>
      <p className="mt-2 text-body text-dark-700">
        {error.message || "We couldn't load the products. Please try again."}
      </p>
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={reset}
          className="rounded-full bg-dark-900 px-6 py-3 text-body-medium text-light-100 transition-colors hover:bg-dark-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-dark-500 focus-visible:ring-offset-2"
        >
          Try again
        </button>
        <Link
          href={`/${lang}`}
          className="rounded-full border border-light-300 px-6 py-3 text-body-medium text-dark-900 transition-colors hover:border-dark-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-dark-500 focus-visible:ring-offset-2"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
