# Subscribe Page Design

**Date:** 2026-05-27  
**Status:** Approved

## Summary

Add a standalone `/subscribe` page at a shareable URL. Visitors enter their email and subscribe to blog post notifications. Uses the existing `/api/newsletter/subscribe` endpoint — no new backend required.

---

## Context

The newsletter backend is already fully built:
- `/api/newsletter/subscribe` — validates email, creates Subscriber doc in MongoDB, sends welcome email via Resend
- `/api/newsletter/unsubscribe` — one-click unsubscribe via email param
- `/api/admin/notify-post` — sends blog post notification emails to all active subscribers
- Admin dashboard already has a "Notify subscribers" bell button per post
- BlogPostForm has a "Notify subscribers" checkbox on publish

The only missing piece is a standalone shareable signup URL.

---

## Page: `/subscribe`

**File to create:** `app/subscribe/page.jsx`

### Layout

- Full-height page (`min-h-screen`) with `bg-[#0a0a0a]`
- Vertically and horizontally centered content column
- Max width: `max-w-md` with `px-6`
- Client component (`"use client"`) to handle form state

### Content (top to bottom)

1. **Logo** — Owen Digitals wordmark/logo, links back to `/`
2. **Headline** — `"Stay in the loop"`, `text-4xl font-bold text-white font-manrope`
3. **Subtext** — `"Get notified when I publish new articles on design, business, and building."`, `text-white/60 text-base font-manrope`
4. **Form** — email input + Subscribe button (side by side on md+, stacked on mobile)
   - Input: `type="email"`, placeholder `"your@email.com"`, full border/bg matching site style
   - Button: brand red `bg-[#b02222]`, text `"Subscribe"`, shows spinner while loading
5. **Privacy note** — `"No spam. Unsubscribe any time."`, `text-white/30 text-sm`

### Form States

| State | UI |
|---|---|
| Default | Empty form |
| Loading | Button disabled, shows spinner icon |
| Success | Form hidden, replaced with checkmark icon + `"You're in! Check your inbox for a welcome email."` |
| Already subscribed | Inline message below input: `"You're already subscribed."` (not an error, informational) |
| Invalid email | Inline error: `"Please enter a valid email address."` |
| Server error | Inline error: `"Something went wrong. Please try again."` |

### API Call

```
POST /api/newsletter/subscribe
Body: { email: string }
Response 200: { message: "Subscribed successfully" }
Response 409: already subscribed
Response 400: invalid email
Response 500: server error
```

### SEO

- Page title: `"Subscribe | Owen Digitals"`
- Meta description: `"Get notified when Owen publishes new articles on design, business, and building."`
- `app/subscribe/page.jsx` is a **server component** that exports `metadata` and renders `<SubscribeForm />`
- `app/subscribe/SubscribeForm.jsx` is the `"use client"` component that owns all form state and interaction

### No Navbar/Footer

The subscribe page stands alone — no site navigation, no footer. Just the logo (links home) and the form. This keeps the experience clean and focused for people arriving via a shared link.

---

## Files

| Action | Path |
|---|---|
| Create | `app/subscribe/page.jsx` — server component, exports metadata, renders SubscribeForm |
| Create | `app/subscribe/SubscribeForm.jsx` — client component, owns form state |

No other files need to change.

---

## Out of Scope

- Double opt-in confirmation email (already handled by welcome email in existing subscribe API)
- Admin subscriber management changes (already built)
- Notification trigger changes (already built)
- Unsubscribe page UI changes
