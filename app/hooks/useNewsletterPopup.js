"use client";

import { useState, useCallback } from "react";

const NEWSLETTER_API = "/api/newsletter/subscribe";

export function useNewsletterPopup(options = {}) {
  const { onSuccess } = options;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const subscribe = useCallback(async (email) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(NEWSLETTER_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        onSuccess?.(email);
        return { success: true };
      } else {
        setError(result.error || "Failed to subscribe");
        return { success: false, error: result.error };
      }
    } catch (err) {
      const message = "Failed to subscribe. Please try again.";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, [onSuccess]);

  return { subscribe, loading, error };
}