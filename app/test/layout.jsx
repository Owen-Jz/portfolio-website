// Internal scratch page — keep it out of search results.
export const metadata = {
  title: "Test",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestLayout({ children }) {
  return children;
}
