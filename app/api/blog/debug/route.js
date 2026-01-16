import { NextResponse } from "next/server";
import connectDB from "../../../libs/db";
import BlogPost from "../../../models/BlogPost";

/**
 * Debug API to see what's in the database
 * GET /api/blog/debug
 */
export async function GET(request) {
  try {
    await connectDB();

    const posts = await BlogPost.find({ published: true })
      .select("_id title slug isFeatured order")
      .sort({ isFeatured: -1, order: 1, createdAt: -1 })
      .lean();

    // Show raw data
    const debugData = posts.map(post => ({
      _id: post._id.toString(),
      title: post.title,
      slug: post.slug,
      isFeatured: post.isFeatured,
      isFeaturedType: typeof post.isFeatured,
      order: post.order,
      orderType: typeof post.order,
    }));

    return NextResponse.json({ 
      success: true, 
      count: posts.length,
      data: debugData 
    }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
