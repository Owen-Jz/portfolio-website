import SubscribeForm from "./SubscribeForm";

export const metadata = {
  title: "Subscribe",
  description:
    "Get notified when Owen publishes new articles on design, business, and building.",
  alternates: { canonical: "/subscribe" },
};

export default function SubscribePage() {
  return <SubscribeForm />;
}
