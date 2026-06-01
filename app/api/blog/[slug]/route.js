import { NextResponse } from "next/server";
import connectDB from "../../../libs/db";
import BlogPost from "../../../models/BlogPost";

// Never cache: engagement counts (views/likes) must always be fresh,
// otherwise the browser/CDN serves a stale count after a view is recorded.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { slug } = await params;

    const post = await BlogPost.findOne({ slug, published: true }).lean();

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: post },
      { status: 200, headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

