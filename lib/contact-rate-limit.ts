import "server-only"

type Bucket = { count: number; windowStart: number }

const buckets = new Map<string, Bucket>()

function windowMs(): number {
  const raw = process.env.CONTACT_RATE_LIMIT_WINDOW_MS
  const n = raw ? Number.parseInt(raw, 10) : NaN
  return Number.isFinite(n) && n > 0 ? n : 15 * 60 * 1000
}

function maxPerWindow(): number {
  const raw = process.env.CONTACT_RATE_LIMIT_MAX
  const n = raw ? Number.parseInt(raw, 10) : NaN
  return Number.isFinite(n) && n > 0 ? n : 8
}

function pruneExpired(): void {
  if (buckets.size < 500) return
  const now = Date.now()
  const w = windowMs()
  for (const [key, b] of buckets.entries()) {
    if (now - b.windowStart > w) buckets.delete(key)
  }
}

/**
 * Best-effort client IP for rate limiting behind proxies (Firebase / Cloud Run / Vercel).
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim()
    if (first) return first
  }
  const realIp = request.headers.get("x-real-ip")?.trim()
  if (realIp) return realIp
  const cf = request.headers.get("cf-connecting-ip")?.trim()
  if (cf) return cf
  return "unknown"
}

export function checkContactRateLimit(
  ip: string,
): { ok: true } | { ok: false; retryAfterSec: number } {
  pruneExpired()

  const now = Date.now()
  const w = windowMs()
  const max = maxPerWindow()

  let bucket = buckets.get(ip)
  if (!bucket || now - bucket.windowStart > w) {
    bucket = { count: 0, windowStart: now }
    buckets.set(ip, bucket)
  }

  bucket.count += 1

  if (bucket.count > max) {
    const retryAfterMs = bucket.windowStart + w - now
    const retryAfterSec = Math.max(1, Math.ceil(retryAfterMs / 1000))
    return { ok: false, retryAfterSec }
  }

  return { ok: true }
}
