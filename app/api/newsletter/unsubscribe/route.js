import { NextResponse } from "next/server";
import connectDB from "../../../libs/db";
import Subscriber from "../../../models/Subscriber";

export async function DELETE(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const subscriber = await Subscriber.findOne({ email: normalizedEmail });

    if (!subscriber) {
      return NextResponse.json(
        { success: false, error: "Subscriber not found" },
        { status: 404 }
      );
    }

    subscriber.status = "unsubscribed";
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();

    return NextResponse.json(
      { success: true, message: "Successfully unsubscribed" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Newsletter unsubscribe error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to unsubscribe" },
      { status: 500 }
    );
  }
}