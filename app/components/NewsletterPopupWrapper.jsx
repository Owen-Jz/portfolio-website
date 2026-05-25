"use client";

import { useState, useEffect } from "react";
import NewsletterPopup from "./ui/NewsletterPopup";

const POPUP_DISMISSED_KEY = "owen_newsletter_dismissed";
const POPUP_SUBSCRIBED_KEY = "owen_newsletter_subscribed";

export default function NewsletterPopupWrapper() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(POPUP_DISMISSED_KEY);
    const subscribed = localStorage.getItem(POPUP_SUBSCRIBED_KEY);
    if (dismissed || subscribed) return;
    setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <NewsletterPopup
      onSubscribe={async (email) => {
        const res = await fetch("/api/newsletter/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const result = await res.json();
        return result;
      }}
    />
  );
}