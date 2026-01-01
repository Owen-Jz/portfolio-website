import { NextResponse } from "next/server";
import connectDB from "../../libs/db";
import BlogPost from "../../models/BlogPost";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    // Build query
    const query = { published: true };
    if (category && category !== "All") {
      query.category = category;
    }

    // Fetch blog posts
    const posts = await BlogPost.find(query)
      .sort({ createdAt: -1 }) // Sort by newest first
      .lean(); // Convert to plain JavaScript objects

    return NextResponse.json({ success: true, data: posts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
