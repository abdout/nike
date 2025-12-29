// Sentry Client Configuration
// This file is a template. To enable Sentry:
// 1. Install: pnpm add @sentry/nextjs
// 2. Remove the /* and */ comments below

/*
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  debug: false,
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV === "production",

  beforeSend(event: Sentry.Event) {
    if (event.breadcrumbs) {
      event.breadcrumbs = event.breadcrumbs.map((breadcrumb) => {
        if (breadcrumb.data?.url) {
          const url = new URL(breadcrumb.data.url as string, "http://localhost");
          url.searchParams.delete("token");
          url.searchParams.delete("session");
          breadcrumb.data.url = url.pathname + url.search;
        }
        return breadcrumb;
      });
    }

    if (
      typeof window !== "undefined" &&
      window.location.hostname === "localhost"
    ) {
      return null;
    }

    return event;
  },

  ignoreErrors: [
    "top.GLOBALS",
    "ResizeObserver loop limit exceeded",
    "ResizeObserver loop completed with undelivered notifications",
    "Network request failed",
    "Failed to fetch",
    "Load failed",
    "AbortError",
  ],
});
*/

export {};
