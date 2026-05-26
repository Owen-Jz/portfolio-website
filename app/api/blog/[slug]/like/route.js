import { NextResponse } from "next/server";
import connectDB from "../../../../libs/db";
import BlogPost from "../../../../models/BlogPost";

export async function POST(request, { params }) {
  try {
    await connectDB();

    const { slug } = await params;
    const body = await request.json();
    const action = body.action;

    if (action !== "like" && action !== "unlike") {
      return NextResponse.json(
        { success: false, error: "Invalid action. Use 'like' or 'unlike'." },
        { status: 400 }
      );
    }

    const increment = action === "like" ? 1 : -1;

    const post = await BlogPost.findOneAndUpdate(
      {
        slug,
        published: true,
        ...(action === "unlike" ? { likes: { $gt: 0 } } : {}),
      },
      { $inc: { likes: increment } },
      { new: true, select: "likes" }
    );

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found or cannot unlike" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, likes: post.likes },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json(
      { success: false, error: "Failed to toggle like" },
      { status: 500 }
    );
  }
}
