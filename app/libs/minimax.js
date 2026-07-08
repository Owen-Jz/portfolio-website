/**
 * Minimal MiniMax LLM client for server-side use in API routes.
 *
 * MiniMax exposes an OpenAI-compatible chat completion endpoint at
 * `${baseUrl}/text/chatcompletion_v2`. We keep this tiny and dependency-free:
 * one `chat()` call with a fresh per-attempt timeout and a couple of retries
 * for transient failures (rate limits, overloads, 5xx, network blips).
 */

const ATTEMPT_TIMEOUT_MS = 45000;

function getConfig() {
  const apiKey = process.env.MINIMAX_API_KEY;
  if (!apiKey) {
    throw new Error("MINIMAX_API_KEY is not configured");
  }
  return {
    apiKey,
    baseUrl: process.env.MINIMAX_BASE_URL || "https://api.minimax.io/v1",
    model: process.env.MINIMAX_MODEL || "MiniMax-M2.5",
  };
}

function isRetryable(status) {
  return status === 429 || status === 529 || status >= 500;
}

/**
 * Send a chat completion request and return the assistant's text content.
 *
 * @param {Array<{role: string, content: string}>} messages
 * @param {{ temperature?: number, maxTokens?: number }} [options]
 * @returns {Promise<string>}
 */
export async function chat(messages, options = {}) {
  const { apiKey, baseUrl, model } = getConfig();
  const maxAttempts = 3;
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), ATTEMPT_TIMEOUT_MS);

    try {
      const res = await fetch(`${baseUrl}/text/chatcompletion_v2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: options.temperature ?? 0.4,
          max_tokens: options.maxTokens ?? 3000,
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        const err = new Error(`MiniMax API error ${res.status}: ${body}`);
        err.status = res.status;
        // Retry transient failures, fail fast on 4xx (bad key, bad request).
        if (attempt < maxAttempts && isRetryable(res.status)) {
          lastError = err;
          await new Promise((r) => setTimeout(r, 1200 * attempt));
          continue;
        }
        throw err;
      }

      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error("MiniMax returned an empty response");
      }
      return content;
    } catch (error) {
      if (error.name === "AbortError") {
        lastError = new Error(`MiniMax request timed out after ${ATTEMPT_TIMEOUT_MS / 1000}s`);
      } else {
        lastError = error;
      }
      // Network errors (TypeError) are worth one more shot.
      const transient = error.name === "AbortError" || error.name === "TypeError";
      if (attempt < maxAttempts && transient) {
        await new Promise((r) => setTimeout(r, 1200 * attempt));
        continue;
      }
      throw lastError;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  throw lastError || new Error("MiniMax request failed");
}

/**
 * Pull the first balanced JSON object out of a model response. Models often
 * wrap JSON in prose or ```json fences, so we scan for the outermost braces.
 */
export function extractJson(text) {
  if (!text) return null;

  // Strip code fences if present.
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : text;

  const start = candidate.indexOf("{");
  if (start === -1) return null;

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = start; i < candidate.length; i++) {
    const ch = candidate[i];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }
    if (ch === '"') {
      inString = true;
    } else if (ch === "{") {
      depth++;
    } else if (ch === "}") {
      depth--;
      if (depth === 0) {
        const slice = candidate.slice(start, i + 1);
        try {
          return JSON.parse(slice);
        } catch {
          return null;
        }
      }
    }
  }
  return null;
}
