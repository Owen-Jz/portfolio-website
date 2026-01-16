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

// Updated blog posts with educational content and better images
const blogPosts = [
  {
    slug: "the-future-of-ui-ux-design-in-2024",
    title: "The Future of UI/UX Design in 2024",
    excerpt:
      "Exploring the latest trends and innovations shaping the design landscape this year. From AI-powered design tools to sustainable design practices, discover what's next in the world of digital design.",
    content: `
      <p>The world of UI/UX design is undergoing a revolutionary transformation in 2024. As technology advances at an unprecedented pace, designers must adapt to new tools, methodologies, and user expectations. This comprehensive guide will walk you through the most significant trends shaping our industry.</p>
      
      <h2>AI-Powered Design Tools: The New Creative Partner</h2>
      <p>Artificial intelligence is no longer a futuristic concept—it's actively transforming how we design. Tools like Figma's AI features, Adobe Firefly, and Midjourney are becoming essential parts of the modern designer's toolkit.</p>
      
      <p><strong>Key AI Applications in Design:</strong></p>
      <ul>
        <li><strong>Automated Design Variations:</strong> AI can generate dozens of layout variations in seconds</li>
        <li><strong>Smart Color Palette Generation:</strong> Algorithms suggest harmonious color combinations</li>
        <li><strong>Content-Aware Layouts:</strong> AI adapts designs based on content length and type</li>
        <li><strong>User Behavior Prediction:</strong> Machine learning predicts user interactions</li>
      </ul>
      
      <h2>Sustainable Design: Responsibility in the Digital Age</h2>
      <p>As the world grapples with climate change, the tech industry is recognizing its environmental impact. Sustainable design practices are becoming a moral imperative and competitive advantage.</p>
      
      <h2>Accessibility: From Compliance to Core Value</h2>
      <p>Accessibility is evolving from a checkbox requirement to a fundamental design principle. The best designers now approach every project with an "accessibility-first" mindset.</p>
      
      <h2>Conclusion</h2>
      <p>The future of UI/UX design is bright but demanding. Success requires continuous learning, embracing new technologies, and maintaining focus on human-centered design principles.</p>
    `,
    category: "Design",
    date: "March 15, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
    author: "Owen Digitals",
    published: true,
  },
  {
    slug: "building-scalable-nextjs-applications",
    title: "Building Scalable Next.js Applications",
    excerpt:
      "Best practices and patterns for creating maintainable and performant web applications. Learn about server components, caching strategies, and optimization techniques.",
    content: `
      <p>Next.js has become the industry standard for building production-grade React applications. With the introduction of the App Router and Server Components, the framework offers powerful new paradigms for building scalable applications.</p>
      
      <h2>Understanding the App Router Architecture</h2>
      <p>The App Router represents a fundamental shift in how we structure Next.js applications. It uses React Server Components by default and provides more granular control over layouts and loading states.</p>
      
      <h2>Server Components: The Game Changer</h2>
      <p>Server Components revolutionize how we think about React applications. By rendering on the server, they eliminate the client-side JavaScript bundle for those components.</p>
      
      <h2>Advanced Caching Strategies</h2>
      <p>Next.js provides multiple layers of caching that can dramatically improve performance. Understanding when and how to use each is crucial for building scalable applications.</p>
      
      <h2>Conclusion</h2>
      <p>Building scalable Next.js applications requires a holistic approach. By leveraging Server Components, implementing proper caching, and following best practices for data handling, you can create applications that perform excellently at any scale.</p>
    `,
    category: "Business",
    date: "March 10, 2024",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop",
    author: "Owen Digitals",
    published: true,
  },
  {
    slug: "my-journey-as-a-creative",
    title: "My Journey as a Creative Professional",
    excerpt:
      "Reflecting on my path from aspiring designer to running my own creative studio. The challenges, lessons learned, and what keeps me motivated.",
    content: `
      <p>Every creative professional has a unique journey. Mine has been filled with unexpected turns, valuable lessons, and countless moments that shaped who I am today.</p>
      
      <h2>The Beginning: Finding My Passion</h2>
      <p>I didn't start as a designer. Like many in this field, I discovered my passion through exploration. The turning point came when I realized that design wasn't just about making things pretty—it was about solving problems.</p>
      
      <h2>The Learning Years</h2>
      <p>I'm a firm believer in learning by doing. Some of my most valuable lessons came from personal projects, open source contributions, and yes, failure.</p>
      
      <h2>Going Independent</h2>
      <p>The decision to start Owen Digitals wasn't easy. It meant leaving the security of a steady paycheck for the uncertainty of freelancing.</p>
      
      <h2>Conclusion</h2>
      <p>My journey continues, and I'm excited about what's next. If you're starting your own creative path, remember: comparison is the thief of joy. Focus on your own growth.</p>
    `,
    category: "Personal Life",
    date: "February 10, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop",
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
