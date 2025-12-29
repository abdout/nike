import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

export const runtime = "edge";
export const dynamic = "force-dynamic";

type HealthStatus = "healthy" | "degraded" | "unhealthy";

interface HealthResponse {
  status: HealthStatus;
  timestamp: string;
  version: string;
  uptime: number;
  services: {
    database: {
      status: HealthStatus;
      latency?: number;
      error?: string;
    };
    api: {
      status: HealthStatus;
    };
  };
  environment: string;
}

const startTime = Date.now();

export async function GET(): Promise<NextResponse<HealthResponse>> {
  const timestamp = new Date().toISOString();
  const uptime = Math.floor((Date.now() - startTime) / 1000);

  let dbStatus: HealthStatus = "healthy";
  let dbLatency: number | undefined;
  let dbError: string | undefined;

  // Check database connectivity
  try {
    const dbStart = Date.now();
    await db.execute(sql`SELECT 1`);
    dbLatency = Date.now() - dbStart;

    // Consider degraded if latency > 1000ms
    if (dbLatency > 1000) {
      dbStatus = "degraded";
    }
  } catch (error) {
    dbStatus = "unhealthy";
    dbError =
      error instanceof Error ? error.message : "Database connection failed";
  }

  const overallStatus: HealthStatus =
    dbStatus === "unhealthy" ? "unhealthy" : dbStatus;

  const response: HealthResponse = {
    status: overallStatus,
    timestamp,
    version: process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7) ?? "local",
    uptime,
    services: {
      database: {
        status: dbStatus,
        latency: dbLatency,
        error: dbError,
      },
      api: {
        status: "healthy",
      },
    },
    environment: process.env.NODE_ENV ?? "development",
  };

  const statusCode = overallStatus === "unhealthy" ? 503 : 200;

  return NextResponse.json(response, {
    status: statusCode,
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
