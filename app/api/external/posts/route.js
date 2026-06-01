import { NextResponse } from "next/server";
import connectDB from "../../../libs/db";
import BlogPost from "../../../models/BlogPost";
import { requireApiKey } from "../../../libs/api-key";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// POST - Create a new draft post (API-key protected, for the ZEAL dashboard)
export async function POST(request) {
  try {
    if (!requireApiKey(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();

    // Validate required fields (mirrors admin create logic)
    if (!body.title || !body.slug || !body.excerpt || !body.content) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingPost = await BlogPost.findOne({ slug: body.slug });
    if (existingPost) {
      return NextResponse.json(
        { success: false, error: "A post with this slug already exists" },
        { status: 400 }
      );
    }

    // Create post — drafts by default (published: false unless explicitly true)
    const post = await BlogPost.create({
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      category: body.category || "Design",
      date:
        body.date ||
        new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      readTime: body.readTime || "5 min read",
      image: body.image,
      author: body.author || "Owen Digitals",
      published: body.published ?? false,
      seoTitle: body.seoTitle || body.title,
      seoDescription: body.seoDescription || body.excerpt,
    });

    return NextResponse.json(
      { success: true, data: { _id: post._id, slug: post.slug } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post (external):", error);
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "A post with this slug already exists" },
        { status: 400 }
      );
    }
    // Surface mongoose validation errors (e.g. missing image, bad category)
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to create post" },
      { status: 500 }
    );
  }
}
