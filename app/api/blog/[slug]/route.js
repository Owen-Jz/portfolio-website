import { NextResponse } from "next/server";
import connectDB from "../../../libs/db";
import BlogPost from "../../../models/BlogPost";

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

    return NextResponse.json({ success: true, data: post }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

