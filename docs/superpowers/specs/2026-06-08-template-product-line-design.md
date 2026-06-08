# Owen Digitals Templates — Premium Next.js Template Line

**Status:** Approved design (2026-06-08)
**Owner:** Owen (owendigitals)
**Type:** New revenue product sold on the existing portfolio site

---

## 1. Summary

Sell a line of **premium, distinctive Next.js + Tailwind + Framer Motion templates** as digital products directly from the portfolio site. The wedge is design quality: research across Indie Hackers, Hacker News, and template marketplaces shows founders and indie hackers can now *build* fast (AI) but consistently ship sites that look like generic "AI slop" and cannot fix it themselves. A design engineer selling distinctive, production-grade templates in the buyer's exact stack sits directly on top of that unmet need.

The first product is the template behind `owendigitals.work` itself — the live site is the demo, which removes all doubt about quality and lets us launch in days. A SaaS/startup landing template follows as #2.

Payment sidesteps the Stripe-can't-pay-Nigeria problem entirely by using **Polar.sh** as merchant-of-record (handles global VAT, pays out to Nigeria via Stripe Connect Express). Paystack is added later as an optional NGN checkout.

## 2. Goals

- Launch a first paid digital product within days, validating the full sell → pay → deliver pipeline.
- Establish a repeatable template *line* (portfolio first, SaaS landing next, bundle after).
- Get paid by foreign buyers in USD without a Stripe account, settling to a Nigerian bank.
- Leverage the existing audience engine (blog + newsletter + subscribers) as the launch channel.

## 3. Non-Goals

- No full custom storefront/cart/entitlement system on the site (Polar owns checkout, tax, delivery, license keys).
- No selling via Framer Marketplace (its payouts are Stripe-only and cannot reach Nigeria).
- No backend-heavy SaaS boilerplate — the product is design + frontend, the seller's actual edge.
- The product is NOT the seller's full site stack (admin/MongoDB/Resend/blog-sync stays private — see §6).

## 4. Target Buyer & Positioning

- **Buyers:** indie hackers and technical founders (SaaS landing); designers, developers, freelancers, creators (portfolio).
- **Positioning line:** *"Templates that don't look like templates."* Premium, motion-rich, brand-grade Next.js sites that escape AI-default sameness.
- **Proof of quality:** the live demo deployments and the seller's own portfolio site.

## 5. Product Roadmap

| # | Product | Notes |
|---|---------|-------|
| 1 | **Portfolio / Personal template** | The template behind owendigitals.work. Designer/dev/freelancer/creator portfolio + blog. Already built → fastest to launch. Ships first. |
| 2 | **SaaS / Startup landing template** | Hero, features, pricing, testimonials, CTA, footer. Highest-volume category. Fresh build. |
| — | **Bundle (both)** | Offered once both exist, to raise average order value. |

## 6. Scoping Decision — What Ships Inside a Template

The seller's real site includes admin, MongoDB, Resend email, blog-sync, and Paystack. That stack is too heavy and too personal to sell. The product is a **"lite," config-driven** extraction:

**Included:**
- Front-end design, structure, page layouts, and Framer Motion animations (the valuable part)
- Content driven by a simple `site.config.js` (and per-section content files)
- **MDX-based blog** (no MongoDB, no admin panel)
- Clean `README.md`, setup/customization docs, and a license file
- One-click deploy-to-Vercel

**Excluded (stays private to the seller):**
- Admin panel, MongoDB models/connection, Resend email integration, blog-sync, subscriber system, any secrets/keys

**Rationale:** a buyer can actually run and customize a static/config-driven site; they cannot (and should not) inherit the seller's private CMS infrastructure. The lite scope is also what the market actually buys.

## 7. Architecture — Four Isolated Units

1. **Template artifact** — a *separate* repository (public demo branch / private sale repo), independent of the main portfolio site. This is the deliverable.
2. **Live demo** — its own Vercel deployment (e.g. `portfolio-template.owendigitals.work`). The demo is the primary sales asset.
3. **Storefront on the existing site** — new routes that reuse existing components (`NavbarDemo`, `FooterSection`, `GlassCard`, Framer Motion patterns):
   - `/templates` — the line; lists all products.
   - `/templates/[slug]` — product detail: live-demo link, screenshot gallery, "what's included," tech stack, pricing, FAQ, license terms, **Buy** button.
   - `/templates/[slug]/success` — post-purchase confirmation / next steps.
4. **Polar integration** — a Polar product per template; hosted or embedded checkout (`@polar-sh/checkout`); delivery via **auto-invite to a private GitHub repo** (Polar GitHub benefit) plus a **zip download fallback** and a **license key**. Optional webhook handler for a custom confirmation email; otherwise Polar handles delivery end-to-end.

**Isolation note:** the main site is changed only by *adding* storefront routes + a Polar config/optional webhook. The template artifact and demo are fully separate repos/deploys, so productizing the template never destabilizes the live site.

## 8. Money Flow

```
Buyer (USD, any card)
   → Polar hosted/embedded checkout
   → Polar = Merchant of Record (collects payment, remits global VAT/sales tax, issues license + GitHub access)
   → Payout to seller's Nigerian bank via Stripe Connect Express
```

- **No Stripe account required** on the seller's end; Polar's MoR model reaches Nigeria where standalone Stripe cannot.
- **Polar fees:** ~4% + $0.40 per sale (reconfirm current rate in-dashboard before launch).
- **Phase 3:** add **Paystack** as an optional NGN checkout on the site for local buyers; USD settlement via a Zenith Bank domiciliary account if needed. Paystack is not an MoR, so it is paired with Polar for international tax coverage, not a replacement.
- **Gumroad** is the documented fallback rail (also MoR, also pays Nigeria via bank/PayPal-USD, but higher fee at 10% + $0.50).

## 9. Pricing

| Item | Launch | Settled |
|------|--------|---------|
| Portfolio template | **$49** (intro) | $59–$79 |
| SaaS landing template | — | $59–$79 |
| Bundle (both) | — | $99–$129 |
| Free "lite" version (optional) | Free | Lead magnet → newsletter → funnel to paid |

- **License model:** one purchase = unlimited personal + client projects; **no reselling/redistribution**. Updates delivered free via the repo.

## 10. Funnel (Existing-Audience Leverage)

The site already has a blog, newsletter, and subscriber list. Launch sequence:
- Publish a "how I built this site" blog post (doubles as proof + tutorial).
- Newsletter blast to subscribers.
- Add a tasteful "Get this template" CTA in the site footer/nav — visitors browsing the portfolio are already inside the demo.

## 11. Edge Cases & Error Handling

- **Buyer without a GitHub account** → zip download + license key fallback (no hard dependency on GitHub invite).
- **Refunds** → rely on Polar's policy; product page states "digital product, non-refundable after delivery/access granted."
- **Failed/abandoned payment** → handled by Polar checkout; success page only reached on confirmed payment.
- **Piracy** → accepted risk at this scale; private repo + license is sufficient. No DRM.
- **Template updates** → pushed to the repo; buyers with access pull updates for free (a selling point, not a support burden).

## 12. Testing Strategy

- Run the full **checkout → delivery flow in Polar test mode** before going live.
- Verify **both** delivery paths: GitHub private-repo auto-invite AND zip + license-key fallback.
- **Demo-site performance** (Lighthouse) — speed materially affects template conversion; the demo must be fast and flawless on mobile.
- Validate license-key issuance/format if a key is used.
- Smoke-test storefront routes (`/templates`, `/templates/[slug]`, `/success`) on mobile and desktop.

## 13. Build Phases

- **Phase 1 — Launch (~days):** productize the portfolio into the lite template repo → deploy live demo → set up Polar product + payout → build `/templates` + product detail + success pages → go live with the $49 intro price.
- **Phase 2:** build the SaaS/startup landing template → add it to the line → introduce the bundle.
- **Phase 3:** add Paystack NGN checkout, ship the free lite-version funnel, and evaluate a UI-kit upsell.

## 14. Open Items to Reconfirm Before Launch

- Polar's current fee and Nigeria payout mechanism (verify in-dashboard).
- Exact subdomain for the demo deploy.
- Final settled price after the $49 intro window.
- Whether the free lite version ships in Phase 1 or Phase 3.

---

## Research Sources (demand + market + payments)

- Indie Hackers — "I suck at design," "design takes me so long," "do indie hackers buy landing page templates anymore," premium Next.js template case study, productized design services.
- Hacker News — engineers underestimating design difficulty.
- MatchKit — "indie hacker design system 2026" (AI-slop differentiation crisis).
- Marketplaces/pricing — Framer Marketplace, Tailwind Plus, Cruip, Vercel templates, ThemeForest; ShipFast/Supastarter/Makerkit (boilerplate price points).
- Payments — Polar supported-countries (Nigeria via Stripe Connect Express), Gumroad cross-border payouts (Nigeria, Oct 2024), Lemon Squeezy PayPal payouts, Paystack USD settlement (Zenith), Framer creator payouts (Stripe-only).
