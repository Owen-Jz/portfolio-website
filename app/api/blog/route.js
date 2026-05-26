import { NextResponse } from "next/server";
import connectDB from "../../libs/db";
import mongoose from "mongoose";

// Disable caching for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    // Use native MongoDB to bypass Mongoose caching issues
    const db = mongoose.connection.db;
    const collection = db.collection("blogposts");

    // Build query
    const query = { published: true };
    if (category && category !== "All") {
      query.category = category;
    }

    // Fetch blog posts - prioritize featured, then order, then newest
    const posts = await collection.find(query)
      .sort({ isFeatured: -1, order: 1, createdAt: -1 })
      .toArray();

    // Serialize for frontend
    const serializedPosts = posts.map(post => ({
      ...post,
      _id: post._id.toString(),
      isFeatured: post.isFeatured || false,
      order: post.order ?? 999,
      views: post.views ?? 0,
      likes: post.likes ?? 0,
    }));

    return NextResponse.json({ success: true, data: serializedPosts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
