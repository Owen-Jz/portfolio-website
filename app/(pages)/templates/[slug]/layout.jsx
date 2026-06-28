// Server layout: per-template SEO metadata + Product JSON-LD for the
// client-rendered template product page.
import { getTemplateBySlug } from "../../../components/templatesData";

const SITE_URL = "https://www.owendigitals.work";

function truncate(text, max = 160) {
  if (!text) return "";
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

// Normalize a cover path: absolute URLs pass through, local paths get a
// leading slash so metadataBase can resolve them.
function resolveImage(image) {
  if (!image) return null;
  if (image.startsWith("http")) return image;
  return image.startsWith("/") ? image : `/${image}`;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tpl = getTemplateBySlug(slug);

  if (!tpl) {
    return {
      title: "Template not found",
      description: "This template could not be found.",
      robots: { index: false },
    };
  }

  const description = truncate(tpl.description);
  const image = resolveImage(tpl.cover);
  const images = image ? [image] : undefined;

  return {
    title: tpl.name,
    description,
    alternates: { canonical: `/templates/${slug}` },
    openGraph: {
      title: tpl.name,
      description,
      url: `/templates/${slug}`,
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      images,
    },
  };
}

export default async function TemplateLayout({ children, params }) {
  const { slug } = await params;
  const tpl = getTemplateBySlug(slug);

  const url = `${SITE_URL}/templates/${slug}`;
  const image = resolveImage(tpl?.cover);

  const productSchema = tpl
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: tpl.name,
        description: tpl.description,
        image: image
          ? image.startsWith("http")
            ? image
            : `${SITE_URL}${image}`
          : undefined,
        url,
        brand: { "@type": "Brand", name: "Owen Digitals" },
        offers: {
          "@type": "Offer",
          price: String(tpl.priceUsd),
          priceCurrency: "USD",
          availability:
            tpl.status === "available"
              ? "https://schema.org/InStock"
              : "https://schema.org/PreOrder",
          url,
        },
      }
    : null;

  return (
    <>
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      {children}
    </>
  );
}
