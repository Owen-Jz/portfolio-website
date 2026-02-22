/**
 * Import blog posts from JSON file
 * Run: node scripts/importBlogPosts.js
 * 
 * This script reads blog posts from blogPostsData.json and imports them into MongoDB
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
        isFeatured: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
        seoTitle: { type: String, trim: true },
        seoDescription: { type: String, trim: true },
    },
    { timestamps: true }
);

const BlogPost = mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);

async function importBlogPosts() {
    try {
        console.log("📖 Reading blog posts from JSON file...");
        const jsonPath = join(__dirname, "blogPostsData.json");
        const blogPosts = JSON.parse(readFileSync(jsonPath, "utf-8"));
        console.log(`✅ Found ${blogPosts.length} blog posts in JSON file\n`);

        console.log("🔌 Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 10000,
        });
        console.log("✅ Connected to MongoDB\n");

        // Check existing posts
        const existingCount = await BlogPost.countDocuments();
        console.log(`📊 Found ${existingCount} existing blog post(s) in database\n`);

        let added = 0;
        let updated = 0;
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

        console.log(`\n${"━".repeat(60)}`);
        console.log(`📝 Import Summary:`);
        console.log(`   ✅ Added: ${added}`);
        console.log(`   ⏭️  Skipped: ${skipped}`);
        console.log(`   📚 Total in database: ${existingCount + added}`);
        console.log("━".repeat(60));

        await mongoose.connection.close();
        console.log("\n🔌 Database connection closed");
        console.log("✨ Import complete!\n");
        process.exit(0);
    } catch (error) {
        console.error("\n❌ Error:", error.message);
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
        }
        process.exit(1);
    }
}

importBlogPosts();
