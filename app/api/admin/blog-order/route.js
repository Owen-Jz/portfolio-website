import { NextResponse } from "next/server";
import connectDB from "../../../libs/db";
import mongoose from "mongoose";

// Disable caching
export const dynamic = 'force-dynamic';

/**
 * GET - Fetch all posts for ordering (minimal data)
 */
export async function GET(request) {
  try {
    await connectDB();

    const db = mongoose.connection.db;
    const collection = db.collection("blogposts");

    const posts = await collection.find({ published: true })
      .project({ _id: 1, title: 1, slug: 1, image: 1, category: 1, isFeatured: 1, order: 1 })
      .sort({ isFeatured: -1, order: 1, createdAt: -1 })
      .toArray();

    // Convert _id to string for frontend
    const postsWithStringIds = posts.map(post => ({
      ...post,
      _id: post._id.toString(),
      isFeatured: post.isFeatured || false,
      order: post.order ?? 999,
    }));

    return NextResponse.json({ success: true, data: postsWithStringIds }, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts for ordering:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * PUT - Update post orders and featured status using native MongoDB
 * Body: { posts: [{ _id, order, isFeatured }] }
 */
export async function PUT(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { posts } = body;

    console.log("Received posts to update:", JSON.stringify(posts, null, 2));

    if (!posts || !Array.isArray(posts)) {
      return NextResponse.json(
        { success: false, error: "Invalid request body" },
        { status: 400 }
      );
    }

    const db = mongoose.connection.db;
    const collection = db.collection("blogposts");

    const updateResults = [];

    for (const post of posts) {
      try {
        // Convert string ID to ObjectId
        const objectId = new mongoose.Types.ObjectId(post._id);

        // Direct MongoDB update
        const result = await collection.updateOne(
          { _id: objectId },
          {
            $set: {
              order: Number(post.order),
              isFeatured: Boolean(post.isFeatured),
            },
          }
        );

        console.log(`Updated ${post._id}: matched=${result.matchedCount}, modified=${result.modifiedCount}`);
        
        updateResults.push({
          _id: post._id,
          success: result.matchedCount > 0,
          matched: result.matchedCount,
          modified: result.modifiedCount,
        });
      } catch (err) {
        console.error(`Failed to update post ${post._id}:`, err);
        updateResults.push({ _id: post._id, success: false, error: err.message });
      }
    }

    const allSuccessful = updateResults.every(r => r.success);
    const totalModified = updateResults.reduce((sum, r) => sum + (r.modified || 0), 0);

    return NextResponse.json(
      { 
        success: allSuccessful, 
        message: `Updated ${totalModified} of ${posts.length} posts`,
        details: updateResults,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating post order:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
