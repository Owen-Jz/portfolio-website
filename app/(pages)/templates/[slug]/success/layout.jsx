// Post-checkout confirmation page — never index.
export const metadata = {
  title: "Purchase successful",
  robots: { index: false, follow: false },
};

export default function SuccessLayout({ children }) {
  return children;
}
