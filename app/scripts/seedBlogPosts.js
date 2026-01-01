/**
 * Script to seed the database with blog posts
 * Run this with: node app/scripts/seedBlogPosts.js
 * Make sure MONGODB_URI is set in your .env.local file
 */

import mongoose from "mongoose";
import BlogPost from "../models/BlogPost.js";

// Import blog posts data - adjust path as needed
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
  },
  // Add more posts as needed
];

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable");
  process.exit(1);
}

async function seedBlogPosts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing posts (optional - remove if you want to keep existing posts)
    await BlogPost.deleteMany({});
    console.log("Cleared existing blog posts");

    // Insert blog posts
    const insertedPosts = await BlogPost.insertMany(blogPosts);
    console.log(`Successfully inserted ${insertedPosts.length} blog posts`);

    // Close connection
    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding blog posts:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

seedBlogPosts();

