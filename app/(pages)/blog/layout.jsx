export const metadata = {
  title: "Blog",
  description:
    "Essays and field notes from a full stack design engineer — covering design, technology, business, growth, and lessons from building real products.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog",
    description:
      "Essays and field notes from a full stack design engineer — covering design, technology, business, growth, and lessons from building real products.",
    url: "/blog",
    type: "website",
  },
};

export default function Layout({ children }) {
  return children;
}
