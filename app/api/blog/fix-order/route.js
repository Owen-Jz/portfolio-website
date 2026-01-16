import { NextResponse } from "next/server";
import connectDB from "../../../libs/db";
import mongoose from "mongoose";

/**
 * API route to fix blog posts - uses native MongoDB to bypass Mongoose caching
 * GET /api/blog/fix-order
 */
export async function GET(request) {
  try {
    await connectDB();

    // Use native MongoDB collection directly to bypass Mongoose schema issues
    const db = mongoose.connection.db;
    const collection = db.collection("blogposts");

    // Get all published posts
    const allPosts = await collection.find({ published: true })
      .sort({ createdAt: -1 })
      .toArray();

    console.log(`Found ${allPosts.length} posts to fix`);

    const results = [];

    for (let i = 0; i < allPosts.length; i++) {
      const post = allPosts[i];
      
      // Direct MongoDB update - no Mongoose model involved
      const updateResult = await collection.updateOne(
        { _id: post._id },
        {
          $set: {
            order: i,
            isFeatured: i === 0,
          },
        }
      );

      results.push({
        title: post.title,
        slug: post.slug,
        order: i,
        isFeatured: i === 0,
        modified: updateResult.modifiedCount,
      });

      console.log(`Fixed: ${post.title} -> order: ${i}, isFeatured: ${i === 0}, modified: ${updateResult.modifiedCount}`);
    }

    // Verify directly from MongoDB
    const verifyPosts = await collection.find({ published: true })
      .project({ title: 1, isFeatured: 1, order: 1, slug: 1 })
      .sort({ order: 1 })
      .toArray();

    return NextResponse.json(
      {
        success: true,
        message: `Fixed ${allPosts.length} posts`,
        updates: results,
        verification: verifyPosts.map(p => ({
          title: p.title,
          slug: p.slug,
          order: p.order,
          isFeatured: p.isFeatured,
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fixing blog posts:", error);
    return NextResponse.json(
      { success: false, error: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}
