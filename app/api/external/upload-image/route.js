import { NextResponse } from "next/server";
import crypto from "crypto";
import { put } from "@vercel/blob";
import { requireApiKey } from "../../../libs/api-key";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// POST - Upload a base64 image to Vercel Blob — API-key protected
export async function POST(request) {
  try {
    if (!requireApiKey(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { imageBase64, filename, contentType } = body || {};

    if (!imageBase64 || typeof imageBase64 !== "string") {
      return NextResponse.json(
        { success: false, error: "imageBase64 is required" },
        { status: 400 }
      );
    }

    // Accept either a raw base64 string or a data URL
    // (e.g. "data:image/jpeg;base64,....") — strip the prefix if present.
    const b64 = imageBase64.replace(/^data:[^;]+;base64,/, "");

    const buffer = Buffer.from(b64, "base64");

    const name = filename || `blog/${crypto.randomUUID()}.jpg`;

    const blob = await put(name, buffer, {
      access: "public",
      contentType: contentType || "image/jpeg",
    });

    return NextResponse.json(
      { success: true, url: blob.url },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading image (external):", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}
