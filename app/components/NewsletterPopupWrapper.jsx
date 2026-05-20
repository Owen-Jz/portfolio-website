"use client";

import { useState } from "react";
import NewsletterPopup from "./ui/NewsletterPopup";

export default function NewsletterPopupWrapper() {
  const [subscribed, setSubscribed] = useState(false);

  if (subscribed) return null;

  return (
    <NewsletterPopup
      onSubscribe={async (email) => {
        const res = await fetch("/api/newsletter/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const result = await res.json();
        if (result.success) setSubscribed(true);
        return result;
      }}
    />
  );
}