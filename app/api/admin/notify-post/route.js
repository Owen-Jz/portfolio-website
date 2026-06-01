import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectDB from "../../../libs/db";
import BlogPost from "../../../models/BlogPost";
import { notifySubscribers } from "../../../libs/notify-subscribers";

async function checkAuth() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    return null;
  }
  return session;
}

export async function POST(request) {
  try {
    const session = await checkAuth();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Post ID is required" },
        { status: 400 }
      );
    }

    const post = await BlogPost.findById(id);

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    const { notified, failed, total } = await notifySubscribers(post);

    if (total === 0) {
      return NextResponse.json(
        { success: true, message: "No subscribers to notify", notified: 0 },
        { status: 200 }
      );
    }

    return NextResponse.json({
      success: true,
      notified,
      failed,
      total,
    });

  } catch (error) {
    console.error("Error sending notifications:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send notifications" },
      { status: 500 }
    );
  }
}
