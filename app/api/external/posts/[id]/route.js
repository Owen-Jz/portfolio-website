import { NextResponse } from "next/server";
import connectDB from "../../../../libs/db";
import BlogPost from "../../../../models/BlogPost";
import { requireApiKey } from "../../../../libs/api-key";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// PATCH - Partial update (e.g. publish/unpublish, edit fields) — API-key protected
export async function PATCH(request, { params }) {
  try {
    if (!requireApiKey(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const post = await BlogPost.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: post }, { status: 200 });
  } catch (error) {
    console.error("Error updating post (external):", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "A post with this slug already exists" },
        { status: 400 }
      );
    }
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to update post" },
      { status: 500 }
    );
  }
}
