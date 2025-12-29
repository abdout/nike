import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
import * as schema from "./schema/index";

// Configure Neon for optimal serverless performance
neonConfig.fetchConnectionCache = true;

// Only load dotenv in development (not needed in Vercel production)
if (process.env.NODE_ENV !== "production") {
  // Dynamic import to avoid bundling in production
  import("dotenv").then((dotenv) => {
    dotenv.config({ path: ".env.local" });
  });
}

/**
 * Neon Serverless Database Connection
 *
 * Uses HTTP driver which is optimized for serverless environments:
 * - No persistent connections (avoids connection pooling issues)
 * - Works with Vercel Edge Runtime
 * - Automatic connection caching via fetchConnectionCache
 *
 * For high-traffic scenarios, consider:
 * - Using Neon's built-in connection pooler (add ?pgbouncer=true to URL)
 * - Or using @neondatabase/serverless WebSocket driver for transactions
 */

const getDatabaseUrl = (): string => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not defined. Please check your environment variables."
    );
  }
  return url;
};

// Create the Neon SQL client
const sql = neon(getDatabaseUrl());

// Export the Drizzle database instance with schema
export const db = drizzle(sql, { schema });

// Export the raw SQL client for direct queries if needed
export { sql as neonClient };
