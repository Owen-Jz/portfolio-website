import connectDB from "../../../libs/db";
import BlogPost from "../../../models/BlogPost";

// Blog post metadata must be generated on the server: social crawlers
// (WhatsApp, Instagram, LinkedIn, X, Facebook) do NOT run JavaScript, so they
// only read the HTML <head> rendered at request time. The page itself is a
// client component that fetches its data after hydration, which crawlers never
// see — hence every post previously fell back to the site-wide OG image.
// This server layout queries the post directly and emits per-post OG/Twitter
// tags so the shared preview shows the post's own image, title, and excerpt.
export const dynamic = "force-dynamic";

const SITE_URL = "https://www.owendigitals.work";

// Normalize a stored image path into something the crawler can fetch.
// Stored values may be absolute (http...), root-relative (/blog_images/x),
// or bare (blog_images/x). metadataBase resolves relative paths to absolute.
function resolveImage(image) {
  if (!image) return null;
  if (image.startsWith("http")) return image;
  return image.startsWith("/") ? image : `/${image}`;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    await connectDB();
    const post = await BlogPost.findOne({ slug, published: true })
      .select("title excerpt image category seoTitle seoDescription")
      .lean();

    if (!post) {
      return {
        title: "Post not found | Owen Digitals",
        description: "This blog post could not be found.",
      };
    }

    const title = post.seoTitle || post.title;
    const description = post.seoDescription || post.excerpt;
    const url = `${SITE_URL}/blog/${slug}`;
    const image = resolveImage(post.image);
    const images = image
      ? [{ url: image, width: 1200, height: 630, alt: post.title }]
      : undefined;

    return {
      title: `${post.title} | Owen Digitals`,
      description,
      alternates: { canonical: `/blog/${slug}` },
      openGraph: {
        title: post.title,
        description,
        url,
        siteName: "Owen Digitals",
        type: "article",
        locale: "en_US",
        images,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description,
        images: image ? [image] : undefined,
      },
    };
  } catch (error) {
    console.error("Failed to generate blog post metadata:", error);
    // Never let metadata generation break the page — fall back to a sane default.
    return {
      title: "Blog | Owen Digitals",
      description:
        "Insights on design, development, business, and growth from Owen Digitals.",
    };
  }
}

export default function BlogPostLayout({ children }) {
  return children;
}
