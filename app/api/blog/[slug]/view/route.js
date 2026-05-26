import { NextResponse } from "next/server";
import connectDB from "../../../../libs/db";
import BlogPost from "../../../../models/BlogPost";

export async function POST(request, { params }) {
  try {
    await connectDB();

    const { slug } = await params;

    const post = await BlogPost.findOneAndUpdate(
      { slug, published: true },
      { $inc: { views: 1 } },
      { new: true, select: "views" }
    );

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, views: post.views },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error recording view:", error);
    return NextResponse.json(
      { success: false, error: "Failed to record view" },
      { status: 500 }
    );
  }
}
