/**
 * Script to add a blog post to MongoDB
 * Run with: node scripts/addBlogPost.js
 * Make sure MONGODB_URI is set in .env.local
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, "..", ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable in .env.local");
  process.exit(1);
}

// Blog Post Schema (inline since we can't import the model easily in a script)
const BlogPostSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Design", "Business", "Personal Life"],
    },
    date: {
      type: String,
      required: true,
    },
    readTime: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      default: "Owen Digitals",
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const BlogPost = mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);

// Sample blog post
const samplePost = {
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
  date: new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  readTime: "5 min read",
  image: "/projects/ecommerce.png",
  author: "Owen Digitals",
  published: true,
};

async function addBlogPost() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Check if post already exists
    const existingPost = await BlogPost.findOne({ slug: samplePost.slug });
    if (existingPost) {
      console.log("Blog post already exists with this slug. Skipping...");
      await mongoose.connection.close();
      process.exit(0);
    }

    // Insert blog post
    const insertedPost = await BlogPost.create(samplePost);
    console.log(`Successfully added blog post: "${insertedPost.title}"`);
    console.log(`Slug: ${insertedPost.slug}`);

    // Close connection
    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error adding blog post:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

addBlogPost();

