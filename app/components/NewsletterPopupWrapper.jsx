"use client";

import { useState, useEffect } from "react";
import NewsletterPopup from "./ui/NewsletterPopup";

const POPUP_DISMISSED_KEY = "owen_newsletter_dismissed";
const POPUP_SUBSCRIBED_KEY = "owen_newsletter_subscribed";

// Read both keys defensively. Either one being set means the popup has
// already done its job and should never appear again for this user.
function hasSeenPopup() {
  if (typeof window === "undefined") return true; // never render on SSR
  try {
    return (
      localStorage.getItem(POPUP_DISMISSED_KEY) === "1" ||
      localStorage.getItem(POPUP_SUBSCRIBED_KEY) === "1"
    );
  } catch {
    // If localStorage is unavailable (private mode, blocked), bias toward NOT
    // showing — better to under-show than to annoy users on every reload.
    return true;
  }
}

export default function NewsletterPopupWrapper() {
  // `null` = not yet checked, `true` = render popup, `false` = never render.
  // This three-state model prevents the popup from briefly mounting before the
  // storage check completes.
  const [shouldRender, setShouldRender] = useState(null);

  useEffect(() => {
    if (hasSeenPopup()) {
      setShouldRender(false);
      return;
    }
    setShouldRender(true);
  }, []);

  if (shouldRender !== true) return null;

  return (
    <NewsletterPopup
      onSubscribe={async (email) => {
        const res = await fetch("/api/newsletter/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const result = await res.json();
        // Persist both keys on success so the popup is truly one-shot.
        if (result?.success) {
          try {
            localStorage.setItem(POPUP_SUBSCRIBED_KEY, "1");
            localStorage.setItem(POPUP_DISMISSED_KEY, "1");
          } catch {}
        }
        return result;
      }}
      onDismiss={() => {
        // Belt-and-suspenders: also write from the wrapper so the gate
        // is set even if the inner component's writes are interrupted.
        try {
          localStorage.setItem(POPUP_DISMISSED_KEY, "1");
        } catch {}
        setShouldRender(false);
      }}
    />
  );
}