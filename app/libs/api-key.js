import crypto from "crypto";

/**
 * Validates the `x-api-key` request header against the ZEAL_API_KEY env var.
 *
 * Uses a constant-time comparison to avoid leaking timing information.
 * Returns false if the env var is unset/empty or the header is missing or
 * does not match.
 *
 * @param {Request} request - the incoming request
 * @returns {boolean} true if the provided key is valid
 */
export function requireApiKey(request) {
  const expected = process.env.ZEAL_API_KEY;

  // If no secret is configured, deny everything.
  if (!expected) {
    return false;
  }

  const provided = request.headers.get("x-api-key");
  if (!provided) {
    return false;
  }

  // Constant-time compare. Buffers of differing length throw in
  // timingSafeEqual, so guard the length first.
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) {
    return false;
  }

  try {
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
