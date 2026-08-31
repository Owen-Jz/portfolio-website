import connectDB from "./libs/db";
import BlogPost from "./models/BlogPost";
import { templatesData } from "./components/templatesData";

const SITE_URL = "https://www.owendigitals.work";

// Regenerate at most once an hour so newly published posts show up without a
// redeploy (the old next-sitemap file was frozen at build time and only knew
// about the hardcoded blogData.js posts).
export const revalidate = 3600;

const STATIC_ROUTES = [
  { path: "", priority: 1.0 },
  { path: "/about", priority: 0.8 },
  { path: "/projects", priority: 0.9 },
  { path: "/projects/ecommerce", priority: 0.7 },
  { path: "/projects/finddr", priority: 0.7 },
  { path: "/projects/jedidah", priority: 0.7 },
  { path: "/projects/organstation", priority: 0.7 },
  { path: "/projects/true-north", priority: 0.7 },
  { path: "/projects/web-kitchen", priority: 0.7 },
  { path: "/projects/naija-diaspora-hub", priority: 0.7 },
  { path: "/projects/nova-trade-case-study", priority: 0.7 },
  { path: "/projects/paidup", priority: 0.7 },
  { path: "/templates", priority: 0.9 },
  { path: "/blog", priority: 0.9 },
  { path: "/solutions/design-os", priority: 0.8 },
  { path: "/solutions/revenue-sprint", priority: 0.8 },
  { path: "/solutions/venture-partnership", priority: 0.8 },
  { path: "/webpricing", priority: 0.8 },
  { path: "/pricing", priority: 0.8 },
  { path: "/brandpricing", priority: 0.7 },
  { path: "/process", priority: 0.6 },
  { path: "/contact", priority: 0.8 },
  { path: "/briefs", priority: 0.5 },
  { path: "/briefs/website", priority: 0.5 },
  { path: "/briefs/branding", priority: 0.5 },
  { path: "/briefs/ui-ux", priority: 0.5 },
  { path: "/subscribe", priority: 0.5 },
  { path: "/links", priority: 0.4 },
  { path: "/abeg", priority: 0.3 },
];

export default async function sitemap() {
  const now = new Date();

  const staticEntries = STATIC_ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  }));

  const templateEntries = templatesData
    .filter((t) => t.status === "available")
    .map((t) => ({
      url: `${SITE_URL}/templates/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  // Blog posts come from MongoDB so posts published through the admin appear
  // without a redeploy. If the DB is unreachable, ship the static routes
  // rather than failing the whole sitemap.
  let postEntries = [];
  try {
    await connectDB();
    const posts = await BlogPost.find({ published: true })
      .select("slug updatedAt createdAt")
      .lean();
    postEntries = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt || post.createdAt || now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Sitemap: failed to load blog posts from DB:", error);
  }

  return [...staticEntries, ...templateEntries, ...postEntries];
}
