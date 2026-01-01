/**
 * Simple script to seed MongoDB with blog posts
 * Run: node scripts/seedBlog.js
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: join(__dirname, "..", ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

// Blog Post Schema
const BlogPostSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true, enum: ["Design", "Business", "Personal Life"] },
    date: { type: String, required: true },
    readTime: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true, default: "Owen Digitals" },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const BlogPost = mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);

// Sample blog posts to add
const blogPosts = [
  {
    slug: "the-future-of-ui-ux-design-in-2024",
    title: "The Future of UI/UX Design in 2024",
    excerpt:
      "Exploring the latest trends and innovations shaping the design landscape this year. From AI-powered design tools to sustainable design practices, discover what's next in the world of digital design.",
    content: `
      <p>The world of UI/UX design is constantly evolving, and 2024 brings exciting new trends and technologies that are reshaping how we create digital experiences.</p>
      
      <h2>AI-Powered Design Tools</h2>
      <p>Artificial intelligence is revolutionizing the design process. Tools like Figma's AI features and Midjourney are helping designers create faster and more efficiently. AI can now generate design variations, suggest color palettes, and even create entire layouts based on simple prompts.</p>
      
      <h2>Sustainable Design Practices</h2>
      <p>As environmental concerns grow, designers are focusing on creating more sustainable digital products. This includes optimizing for energy efficiency, reducing data usage, and designing for longevity rather than planned obsolescence.</p>
      
      <h2>Accessibility First</h2>
      <p>Accessibility is no longer an afterthought. Designers are prioritizing inclusive design from the start, ensuring that digital products are usable by everyone, regardless of their abilities.</p>
      
      <h2>Conclusion</h2>
      <p>The future of UI/UX design is bright, with new technologies and practices that make design more efficient, inclusive, and sustainable. As designers, we must stay ahead of these trends to create the best possible experiences for our users.</p>
    `,
    category: "Design",
    date: "March 15, 2024",
    readTime: "5 min read",
    image: "/projects/ecommerce.png",
    author: "Owen Digitals",
    published: true,
  },
  {
    slug: "building-scalable-nextjs-applications",
    title: "Building Scalable Next.js Applications",
    excerpt:
      "Best practices and patterns for creating maintainable and performant web applications. Learn about server components, caching strategies, and optimization techniques.",
    content: `
      <p>Next.js has become the go-to framework for building modern React applications. In this article, we'll explore best practices for creating scalable and maintainable Next.js applications.</p>
      
      <h2>Server Components</h2>
      <p>Next.js 13+ introduced Server Components, which allow you to render components on the server. This reduces the JavaScript bundle size and improves performance by moving computation to the server.</p>
      
      <h2>Caching Strategies</h2>
      <p>Effective caching is crucial for performance. Next.js provides multiple caching options including static generation, server-side rendering, and incremental static regeneration.</p>
      
      <h2>Code Splitting</h2>
      <p>Proper code splitting ensures that users only download the JavaScript they need. Use dynamic imports and React.lazy to split your code effectively.</p>
      
      <h2>Conclusion</h2>
      <p>Building scalable Next.js applications requires careful planning and following best practices. By leveraging server components, effective caching, and code splitting, you can create applications that perform well at scale.</p>
    `,
    category: "Business",
    date: "March 10, 2024",
    readTime: "8 min read",
    image: "/projects/finddr.png",
    author: "Owen Digitals",
    published: true,
  },
  {
    slug: "my-journey-as-a-creative",
    title: "My Journey as a Creative Professional",
    excerpt:
      "Reflecting on my path from aspiring designer to running my own creative studio. The challenges, lessons learned, and what keeps me motivated.",
    content: `
      <p>Looking back on my journey, I can see how each experience has shaped me into the creative professional I am today.</p>
      
      <h2>The Early Days</h2>
      <p>Starting out, I was fascinated by how design could solve problems and create beautiful experiences. Every project was a learning opportunity.</p>
      
      <h2>Building a Career</h2>
      <p>As I grew, I learned the importance of balancing creativity with business acumen. Running a creative business requires more than just design skills.</p>
      
      <h2>Lessons Learned</h2>
      <p>The biggest lesson? Never stop learning. The design industry evolves rapidly, and staying curious is essential for growth.</p>
      
      <h2>Conclusion</h2>
      <p>My journey continues, and I'm excited about what's next. Every day brings new challenges and opportunities to create something meaningful.</p>
    `,
    category: "Personal Life",
    date: "February 10, 2024",
    readTime: "4 min read",
    image: "/projects/ecommerce.png",
    author: "Owen Digitals",
    published: true,
  },
];

async function seedBlog() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB\n");

    // Check existing posts
    const existingCount = await BlogPost.countDocuments();
    console.log(`📊 Found ${existingCount} existing blog post(s)\n`);

    let added = 0;
    let skipped = 0;

    for (const post of blogPosts) {
      const exists = await BlogPost.findOne({ slug: post.slug });
      if (exists) {
        console.log(`⏭️  Skipped: "${post.title}" (already exists)`);
        skipped++;
      } else {
        await BlogPost.create(post);
        console.log(`✅ Added: "${post.title}"`);
        added++;
      }
    }

    console.log(`\n📝 Summary: ${added} added, ${skipped} skipped`);

    await mongoose.connection.close();
    console.log("\n🔌 Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
}

seedBlog();

