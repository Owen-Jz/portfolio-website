import { NextResponse } from "next/server";
import connectDB from "../../../libs/db";
import BlogPost from "../../../models/BlogPost";
import { blogPosts } from "../../../(pages)/blog/blogData";

/**
 * API route to seed the database with blog posts
 * WARNING: This will delete all existing blog posts and insert new ones
 * Only use this in development or when you want to reset your blog posts
 * 
 * To use: POST /api/blog/seed
 */
export async function POST(request) {
  try {
    // Optional: Add authentication check here to prevent unauthorized access
    // const authHeader = request.headers.get("authorization");
    // if (authHeader !== `Bearer ${process.env.SEED_SECRET}`) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    await connectDB();

    // Clear existing posts
    await BlogPost.deleteMany({});
    console.log("Cleared existing blog posts");

    // Insert blog posts
    const insertedPosts = await BlogPost.insertMany(blogPosts);
    console.log(`Successfully inserted ${insertedPosts.length} blog posts`);

    return NextResponse.json(
      {
        success: true,
        message: `Successfully seeded ${insertedPosts.length} blog posts`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error seeding blog posts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to seed blog posts" },
      { status: 500 }
    );
  }
}

