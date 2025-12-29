"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Error Boundary]", error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="text-heading-3 text-dark-900">Something went wrong</h2>
      <p className="mt-2 max-w-md text-body text-dark-700">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-full bg-dark-900 px-6 py-3 text-body-medium text-light-100 transition-colors hover:bg-dark-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-dark-500 focus-visible:ring-offset-2"
      >
        Try again
      </button>
    </div>
  );
}
