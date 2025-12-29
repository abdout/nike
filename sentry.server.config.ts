// Sentry Server Configuration
// This file is a template. To enable Sentry:
// 1. Install: pnpm add @sentry/nextjs
// 2. Remove the /* and */ comments below

/*
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  debug: false,
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV === "production",

  beforeSend(event: Sentry.Event) {
    if (event.request?.headers) {
      delete event.request.headers["authorization"];
      delete event.request.headers["cookie"];
      delete event.request.headers["x-auth-token"];
    }

    if (event.request?.query_string) {
      const params = new URLSearchParams(event.request.query_string);
      params.delete("token");
      params.delete("session");
      params.delete("password");
      event.request.query_string = params.toString();
    }

    return event;
  },

  ignoreErrors: [
    "Connection terminated unexpectedly",
    "Too Many Requests",
  ],
});
*/

export {};
