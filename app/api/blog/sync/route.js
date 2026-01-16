import { NextResponse } from "next/server";
import connectDB from "../../../libs/db";
import BlogPost from "../../../models/BlogPost";
import { blogPosts } from "../../../(pages)/blog/blogData";

/**
 * API route to update/sync the database with blog posts from blogData.js
 * This will update existing posts and add new ones without deleting anything
 * 
 * To use: POST /api/blog/sync
 */
export async function POST(request) {
  try {
    await connectDB();

    let updated = 0;
    let created = 0;

    for (let i = 0; i < blogPosts.length; i++) {
      const post = blogPosts[i];
      const existingPost = await BlogPost.findOne({ slug: post.slug });
      
      if (existingPost) {
        // Build update object
        const updateFields = {
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category,
          date: post.date,
          readTime: post.readTime,
          image: post.image,
          author: post.author,
          published: true,
        };

        // If order is not set (undefined or null), set it based on position
        if (existingPost.order === undefined || existingPost.order === null) {
          updateFields.order = i;
        }

        // If isFeatured is not set, set first post as featured
        if (existingPost.isFeatured === undefined || existingPost.isFeatured === null) {
          updateFields.isFeatured = i === 0;
        }

        await BlogPost.findOneAndUpdate(
          { slug: post.slug },
          { $set: updateFields }
        );
        updated++;
      } else {
        // Create new post with order based on position
        await BlogPost.create({
          ...post,
          published: true,
          order: i,
          isFeatured: i === 0, // First post is featured by default
        });
        created++;
      }
    }

    // Also ensure ALL posts have order and isFeatured fields (not just the ones in blogData)
    const allPosts = await BlogPost.find({});
    let fixed = 0;
    for (let i = 0; i < allPosts.length; i++) {
      const p = allPosts[i];
      const updates = {};
      
      if (p.order === undefined || p.order === null) {
        updates.order = i;
      }
      if (p.isFeatured === undefined || p.isFeatured === null) {
        updates.isFeatured = false;
      }
      
      if (Object.keys(updates).length > 0) {
        await BlogPost.findByIdAndUpdate(p._id, { $set: updates });
        fixed++;
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: `Successfully synced blog posts: ${updated} updated, ${created} created, ${fixed} fixed missing fields`,
        total: blogPosts.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error syncing blog posts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to sync blog posts: " + error.message },
      { status: 500 }
    );
  }
}

// Also allow GET for easier testing
export async function GET(request) {
  return POST(request);
}
