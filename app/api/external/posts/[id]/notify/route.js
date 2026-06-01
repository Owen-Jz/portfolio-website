import { NextResponse } from "next/server";
import connectDB from "../../../../../libs/db";
import BlogPost from "../../../../../models/BlogPost";
import { requireApiKey } from "../../../../../libs/api-key";
import { notifySubscribers } from "../../../../../libs/notify-subscribers";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// POST - Notify newsletter subscribers about a post — API-key protected
export async function POST(request, { params }) {
  try {
    if (!requireApiKey(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;
    const post = await BlogPost.findById(id);

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    const { notified, failed, total } = await notifySubscribers(post);

    return NextResponse.json(
      { success: true, notified, failed, total },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending notifications (external):", error);
    return NextResponse.json(
      { success: false, error: "Failed to send notifications" },
      { status: 500 }
    );
  }
}
