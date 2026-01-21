import { blogPosts } from "./app/(pages)/blog/blogData.js";

/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: "https://www.owendigitals.work",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 7000,
  additionalPaths: async (config) => {
    const result = [];

    // Add dynamic blog posts
    blogPosts.forEach(post => {
      result.push({
        loc: `/blog/${post.slug}`,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString()
      })
    })

    return result;
  }
};