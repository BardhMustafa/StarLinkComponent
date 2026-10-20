import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/** 5 RFQs per IP per 10 minutes. */
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

type Limiter = { limit(key: string): Promise<{ success: boolean }> };

function createUpstashLimiter(): Limiter | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(LIMIT, "10 m"),
    prefix: "rfq",
    analytics: false,
  });
}

/**
 * Per-instance fallback for local development. On Vercel each function
 * instance has its own memory, so production should set the Upstash env vars.
 */
function createMemoryLimiter(): Limiter {
  const hits = new Map<string, number[]>();
  return {
    async limit(key) {
      const now = Date.now();
      const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
      const success = recent.length < LIMIT;
      if (success) recent.push(now);
      hits.set(key, recent);
      if (hits.size > 10_000) hits.clear();
      return { success };
    },
  };
}

let limiter: Limiter | null = null;

export async function checkRateLimit(key: string): Promise<boolean> {
  limiter ??= createUpstashLimiter() ?? createMemoryLimiter();
  try {
    return (await limiter.limit(key)).success;
  } catch (error) {
    // Never block a genuine customer because Redis is unreachable.
    console.error("[rfq] rate limiter unavailable", error);
    return true;
  }
}
