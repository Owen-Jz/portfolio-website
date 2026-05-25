import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectDB from "../../../libs/db";
import BlogPost from "../../../models/BlogPost";
import Subscriber from "../../../models/Subscriber";
import { Resend } from "resend";
import { generateBlogNotificationHTML, generateBlogNotificationText } from "../../../libs/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const subscribers = await Subscriber.find({ status: "active" }).lean();

    if (subscribers.length === 0) {
      return NextResponse.json(
        { success: true, message: "No subscribers to notify", notified: 0 },
        { status: 200 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL || "owendigitals@gmail.com";

    const BATCH_SIZE = 10;
    let notified = 0;
    let failed = 0;

    for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
      const batch = subscribers.slice(i, i + BATCH_SIZE);

      const emailPromises = batch.map((subscriber) =>
        resend.emails
          .send({
            from: "Owen Digitals <official@owendigitals.work>",
            to: subscriber.email,
            reply_to: adminEmail,
            subject: `New Post: ${post.title}`,
            html: generateBlogNotificationHTML({ post, subscriberEmail: subscriber.email }),
            text: generateBlogNotificationText({ post, subscriberEmail: subscriber.email }),
          })
          .then(() => {
            notified++;
          })
          .catch((err) => {
            console.error(`Failed to notify ${subscriber.email}:`, err);
            failed++;
          })
      );

      await Promise.allSettled(emailPromises);

      if (i + BATCH_SIZE < subscribers.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    return NextResponse.json({
      success: true,
      notified,
      failed,
      total: subscribers.length,
    });

  } catch (error) {
    console.error("Error sending notifications:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send notifications" },
      { status: 500 }
    );
  }
}