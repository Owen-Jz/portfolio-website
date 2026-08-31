export const metadata = {
  title: "PaidUp — Per-Invoice Reconciliation on Nomba Virtual Accounts",
  description:
    "Fintech engineering case study: giving every invoice its own Nomba virtual account so Nigerian SME bank transfers reconcile themselves. Next.js, TypeScript, MongoDB — HMAC-verified webhooks, a transactional ledger, and 147 unit tests, proven with real money in production.",
  alternates: { canonical: "/projects/paidup" },
  openGraph: {
    title: "PaidUp — Per-Invoice Reconciliation on Nomba Virtual Accounts",
    description:
      "Fintech engineering case study: giving every invoice its own Nomba virtual account so Nigerian SME bank transfers reconcile themselves — HMAC-verified webhooks, a transactional ledger, and an AI layer that always has a deterministic fallback.",
    url: "/projects/paidup",
    type: "website",
    images: [{ url: "/projects/paidup-case-study/cover.webp", width: 1600, height: 1000, alt: "PaidUp landing page" }],
  },
};

export default function Layout({ children }) {
  return children;
}
